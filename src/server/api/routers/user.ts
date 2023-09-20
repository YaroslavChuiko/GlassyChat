import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          chats: true,
        },
      });
    }),

  getChats: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const userChats = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          chats: {
            select: {
              chat: {
                include: {
                  messages: {
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
                    orderBy: {
                      createdAt: "desc",
                    },
                    take: 1,
                  },
                },
              },
              role: true,
            },
          },
        },
      });

      if (!userChats) {
        return [];
      }

      return userChats.chats.map((chat) => {
        const { messages, ...rest } = chat.chat;
        return {
          ...rest,
          lastMessage: messages[0],
          userRole: chat.role,
        };
      });
    }),
});
