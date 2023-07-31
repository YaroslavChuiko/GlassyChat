import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
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
                select: {
                  id: true,
                  name: true,
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

      return userRooms.rooms.map((room) => ({
        ...room.room,
        role: room.role,
      }));
    }),
});
