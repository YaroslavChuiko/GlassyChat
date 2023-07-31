import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const roomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.prisma.room.findUnique({
        where: {
          name: input.name,
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The room with this name already exists",
        });
      }

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
});
