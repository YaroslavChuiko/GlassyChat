import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { pusher } from "~/server/pusher";
import { getRandomChatColor } from "~/utils/getRandomColor";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const ensureChatExists = async (
  prisma: PrismaClient,
  id: string
): Promise<void> => {
  try {
    await prisma.chat.findUniqueOrThrow({
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
  chatId: string,
  userId: string
): Promise<void> => {
  const userRoom = await prisma.userChat.findUnique({
    where: { userId_chatId: { userId, chatId } },
  });
  if (userRoom) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You have already joined this chat!",
    });
  }
};

const ensureUserIsAdmin = async (
  prisma: PrismaClient,
  userId: string,
  chatId: string
): Promise<void> => {
  const userChat = await prisma.userChat.findUnique({
    where: { userId_chatId: { userId, chatId } },
  });

  if (!userChat) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You are not a member of this chat!",
    });
  }

  if (userChat.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "This action is only available for admins!",
    });
  }
};

const ensureChatNameUnique = async (
  prisma: PrismaClient,
  name: string,
  notId = ""
): Promise<void> => {
  const exists = await prisma.chat.findUnique({
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
      message: "The chat with this name already exists",
    });
  }
};

export const chatRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(), // room type: "public" | "private";
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ensureChatNameUnique(ctx.prisma, input.name);

      const chat = await ctx.prisma.chat.create({
        data: {
          name: input.name,
          type: "PUBLIC",
          color: getRandomChatColor(),
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

      return chat;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(4) }))
    .mutation(async ({ input, ctx }) => {
      const { id, name } = input;

      await Promise.all([
        ensureChatExists(ctx.prisma, id),
        ensureUserIsAdmin(ctx.prisma, ctx.session.user.id, id),
        ensureChatNameUnique(ctx.prisma, name, id),
      ]);

      const room = await ctx.prisma.chat.update({
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
        ensureChatExists(ctx.prisma, id),
        ensureUserIsAdmin(ctx.prisma, ctx.session.user.id, id),
      ]);

      const room = await ctx.prisma.chat.delete({
        where: {
          id,
        },
      });

      return room;
    }),

  join: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { chatId } = input;

      await Promise.all([
        ensureChatExists(ctx.prisma, chatId),
        ensureUserNotJoinedAlready(ctx.prisma, chatId, ctx.session.user.id),
      ]);

      const userRoom = await ctx.prisma.userChat.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          chat: {
            connect: {
              id: chatId,
            },
          },
          role: "MEMBER",
        },
      });

      pusher
        .trigger(`chat-${chatId}`, "new-member", ctx.session.user)
        .catch((e) => {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: e });
        });

      return userRoom;
    }),

  getMessages: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      await ensureChatExists(ctx.prisma, id);

      const messages = await ctx.prisma.message.findMany({
        where: {
          chatId: id,
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

      await ensureChatExists(ctx.prisma, id);

      const membersCount = await ctx.prisma.chat.findUnique({
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
    .input(
      z.object({ chatId: z.string(), content: z.string().min(1).max(1000) })
    )
    .mutation(async ({ input, ctx }) => {
      const { chatId, content } = input;

      await ensureChatExists(ctx.prisma, chatId);

      const message = await ctx.prisma.message.create({
        data: {
          content,
          chat: {
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

      await ensureChatExists(ctx.prisma, chatId);

      const messages = await ctx.prisma.message.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          chatId,
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
