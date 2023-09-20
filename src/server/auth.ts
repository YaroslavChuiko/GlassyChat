import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type UserColor } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider, {
  type DiscordProfile,
} from "next-auth/providers/discord";
import GithubProvider, { type GithubProfile } from "next-auth/providers/github";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { getRandomUserColor } from "~/utils/getRandomColor";
import { appRouter } from "./api/root";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      color: UserColor;
      // ...other properties
      // role: UserRole;
    };
  }

  interface User {
    color: UserColor;
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        color: user.color,
      },
    }),
  },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (isNewUser) {
        const session = {
          user,
          expires: "",
        };
        const authorizedCaller = appRouter.createCaller({ prisma, session });

        const mainChat = await prisma.chat.findFirst({
          where: {
            type: "GLOBAL",
          },
        });

        if (!mainChat) return;

        await authorizedCaller.chat.join({
          chatId: mainChat.id,
        });
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      profile(profile: DiscordProfile) {
        return {
          id: profile.id.toString(),
          name: profile.username,
          email: profile.email,
          image: profile.avatar,
          color: getRandomUserColor(),
        };
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          color: getRandomUserColor(),
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
