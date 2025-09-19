import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AUTH_ROUTES } from "../constants/auth.constants";

/**
 * Auth.js v5 config: Multi OAuth providers with dynamic rendering.
 */

const providers = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    allowDangerousEmailAccountLinking: false,
  }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID!,
    clientSecret: process.env.AUTH_GITHUB_SECRET!,
    allowDangerousEmailAccountLinking: false,
  }),
  Discord({
    clientId: process.env.AUTH_DISCORD_ID!,
    clientSecret: process.env.AUTH_DISCORD_SECRET!,
    allowDangerousEmailAccountLinking: false,
  }),
  Facebook({
    clientId: process.env.AUTH_FACEBOOK_ID!,
    clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    allowDangerousEmailAccountLinking: false,
  }),
  Twitter({
    clientId: process.env.AUTH_TWITTER_ID!,
    clientSecret: process.env.AUTH_TWITTER_SECRET!,
    allowDangerousEmailAccountLinking: false,
  }),
];

// Export provider map for dynamic rendering in custom pages
export const providerMap = providers.map((provider) => ({
  id: provider.id,
  name: provider.name,
}));

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  debug: process.env.NODE_ENV === "development",
  providers,
  pages: {
    error: AUTH_ROUTES.AUTH_ERROR, // Custom error page
  },

  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});