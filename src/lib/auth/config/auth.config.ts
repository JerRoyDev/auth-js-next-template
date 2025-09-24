import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AUTH_ROUTES } from "../constants/auth.constants";
import { signInSchema } from "../validations/auth.validations";
import { verifyPassword } from "../utils/password";

/**
 * Auth.js v5 config: Multi OAuth providers with dynamic rendering.
 */

const providers = [
  // Credentials Provider - Email/Password authentication
  Credentials({
    name: "credentials",
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "john@example.com"
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Your password"
      },
    },
    async authorize(credentials) {
      try {
        // Validate input using Zod schema
        const { email, password } = await signInSchema.parseAsync(credentials);

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            password: true,
            image: true,
          },
        });

        // Check if user exists and has a password
        if (!user || !user.password) {
          return null;
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
          return null;
        }

        // Return user object (without password)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      } catch (error) {
        // Log error for debugging but don't expose details
        console.error("Credentials authorization error:", error);
        return null;
      }
    },
  }),

  // OAuth Providers
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
    signIn: AUTH_ROUTES.LOGIN, // Custom sign-in page, include some error handling here ex.(error=OAuthAccountNotLinked)
    // newUser: AUTH_ROUTES.REGISTER, // New users will be directed here on first sign in (leave the property out if not of interest)

    // signOut: AUTH_ROUTES.LOGOUT, // Custom sign-out page (if needed)
    // verifyRequest: AUTH_ROUTES.VERIFY_REQUEST, // (if using email sign-in)
    // resetPassword: AUTH_ROUTES.RESET_PASSWORD, // (if implementing password reset)

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