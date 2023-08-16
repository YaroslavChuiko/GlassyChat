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
          rooms: true,
        },
      });
    }),

  getRooms: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const userRooms = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          rooms: {
            select: {
              room: {
                include: {
                  messages: {
                    include: {
                      author: {
                        select: {
                          id: true,
                          name: true,
                          image: true,
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

      if (!userRooms) {
        return [];
      }

      return userRooms.rooms.map((room) => {
        const { messages, ...rest } = room.room;
        return {
          ...rest,
          lastMessage: messages[0],
          userRole: room.role,
        };
      });
    }),
});
