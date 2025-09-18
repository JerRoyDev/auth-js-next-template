import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/**
 * Auth.js v5 config: Google OAuth only (Credentials avvecklad).
 * Lägg till fler providers genom att pusha in i providers-arrayen.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  debug: process.env.NODE_ENV === "development",
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: false,
    }),
    // GitHub({
    //   clientId: process.env.AUTH_GITHUB_ID!,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET!,
    // }),
    // Discord({
    //   clientId: process.env.AUTH_DISCORD_ID!,
    //   clientSecret: process.env.AUTH_DISCORD_SECRET!,
    // }),
    // Facebook({
    //   clientId: process.env.AUTH_FACEBOOK_ID!,
    //   clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    // }),
  ],
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