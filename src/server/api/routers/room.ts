import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { pusher } from "~/server/pusher";
import { getRandomRoomColor } from "~/utils/getRandomColor";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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

  if (userRoom.role !== "ADMIN") {
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
          type: "PUBLIC",
          color: getRandomRoomColor(),
          members: {
            create: {
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              role: "ADMIN",
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
          role: "MEMBER",
        },
      });

      pusher
        .trigger(`chat-${roomId}`, "new-member", ctx.session.user)
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

  getMembersCount: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      await ensureRoomExists(ctx.prisma, id);

      const membersCount = await ctx.prisma.room.findUnique({
        where: {
          id,
        },
        select: {
          _count: {
            select: {
              members: true,
            },
          },
        },
      });

      return { count: membersCount?._count?.members ?? 0 };
    }),

  sendMessage: protectedProcedure
    .input(z.object({ chatId: z.string(), content: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { chatId, content } = input;

      await ensureRoomExists(ctx.prisma, chatId);

      const message = await ctx.prisma.message.create({
        data: {
          content,
          room: {
            connect: {
              id: chatId,
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
              color: true,
            },
          },
        },
      });

      pusher.trigger(`chat-${chatId}`, "new-message", message).catch((e) => {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: e });
      });

      pusher
        .trigger(`chat-info-${chatId}`, "last-message", message)
        .catch((e) => {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: e });
        });

      return message;
    }),

  infiniteMessages: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 30;
      const { chatId, cursor } = input;

      await ensureRoomExists(ctx.prisma, chatId);

      const messages = await ctx.prisma.message.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          roomId: chatId,
        },
        include: {
          author: true,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem!.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),
});
