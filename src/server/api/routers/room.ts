import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { type PrismaClient } from "@prisma/client";
import { pusher } from "~/server/pusher";

const ensureRoomExists = async (
  prisma: PrismaClient,
  id: string
): Promise<void> => {
  try {
    await prisma.room.findUniqueOrThrow({
      where: { id },
    });
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The room doesn't exist!",
      cause: error,
    });
  }
};

const ensureUserNotJoinedAlready = async (
  prisma: PrismaClient,
  roomId: string,
  userId: string
): Promise<void> => {
  const userRoom = await prisma.userRoom.findUnique({
    where: { userId_roomId: { userId, roomId } },
  });
  if (userRoom) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You have already joined this room!",
    });
  }
};

const ensureUserIsAdmin = async (
  prisma: PrismaClient,
  userId: string,
  roomId: string
): Promise<void> => {
  const userRoom = await prisma.userRoom.findUnique({
    where: { userId_roomId: { userId, roomId } },
  });

  if (!userRoom) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You are not a member of this room!",
    });
  }

  if (userRoom.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "This action is only available for admins!",
    });
  }
};

const ensureRoomNameUnique = async (
  prisma: PrismaClient,
  name: string,
  notId = ""
): Promise<void> => {
  const exists = await prisma.room.findUnique({
    where: {
      name,
      NOT: {
        id: notId,
      },
    },
  });
  if (exists) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The room with this name already exists",
    });
  }
};

export const roomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(), // room type: "public" | "private";
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ensureRoomNameUnique(ctx.prisma, input.name);

      const room = await ctx.prisma.room.create({
        data: {
          name: input.name,
          type: "public",
          members: {
            create: {
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              role: "admin",
            },
          },
        },
      });

      return room;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(4) }))
    .mutation(async ({ input, ctx }) => {
      const { id, name } = input;

      await Promise.all([
        ensureRoomExists(ctx.prisma, id),
        ensureUserIsAdmin(ctx.prisma, ctx.session.user.id, id),
        ensureRoomNameUnique(ctx.prisma, name, id),
      ]);

      const room = await ctx.prisma.room.update({
        data: {
          name,
        },
        where: {
          id,
        },
      });

      return room;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      await Promise.all([
        ensureRoomExists(ctx.prisma, id),
        ensureUserIsAdmin(ctx.prisma, ctx.session.user.id, id),
      ]);

      const room = await ctx.prisma.room.delete({
        where: {
          id,
        },
      });

      return room;
    }),

  join: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { roomId } = input;

      await Promise.all([
        ensureRoomExists(ctx.prisma, roomId),
        ensureUserNotJoinedAlready(ctx.prisma, roomId, ctx.session.user.id),
      ]);

      const userRoom = await ctx.prisma.userRoom.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          room: {
            connect: {
              id: roomId,
            },
          },
          role: "member",
        },
      });

      pusher
        .trigger(`room-${roomId}`, "new-member", ctx.session.user)
        .catch((e) => {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: e });
        });

      return userRoom;
    }),

  getMessages: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      await ensureRoomExists(ctx.prisma, id);

      const messages = await ctx.prisma.message.findMany({
        where: {
          roomId: id,
        },
        include: {
          author: true,
        },
      });

      return messages;
    }),

  sendMessage: protectedProcedure
    .input(z.object({ roomId: z.string(), content: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { roomId, content } = input;

      await ensureRoomExists(ctx.prisma, roomId);

      const message = await ctx.prisma.message.create({
        data: {
          content,
          room: {
            connect: {
              id: roomId,
            },
          },
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      pusher.trigger(`room-${roomId}`, "new-message", message).catch((e) => {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: e });
      });

      return message;
    }),
});
