import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { type PrismaClient } from "@prisma/client";

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
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ensureRoomNameUnique(ctx.prisma, input.name);

      const room = await ctx.prisma.room.create({
        data: {
          name: input.name,
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
          user: true,
        },
      });

      return messages;
    }),

  sendMessage: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { id, content } = input;

      await ensureRoomExists(ctx.prisma, id);

      const message = await ctx.prisma.message.create({
        data: {
          content,
          roomId: id,
          userId: ctx.session.user.id,
        },
        include: {
          user: true,
        },
      });

      return message;
    }),
});
