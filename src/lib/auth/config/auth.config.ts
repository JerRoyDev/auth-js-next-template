import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AUTH_ROUTES, SESSION_CONFIG } from "../constants/auth.constants";
import { signInSchema } from "../validations/auth.validations";
import { verifyPassword } from "../utils/password";
import { encode as defaultEncode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";

/**
 * Auth.js v5 config: Multi OAuth providers with dynamic rendering.
 */

const providers = [
  // CREDENTIALS PROVIDER - Email/Password authentication
  // ⚠️  IMPORTANT: If using this provider, consider switching to JWT sessions
  // ⚠️  Database sessions + Credentials requires custom implementation
  // 💡 For production: Consider OAuth providers for better security
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

// Create adapter instance to be used in jwt.encode
const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,

  // DATABASE SESSION STRATEGY WITH CREDENTIALS WORKAROUND
  // This configuration enables database sessions for ALL providers,
  // including the Credentials provider through a custom JWT encode workaround.
  session: {
    strategy: "database",
    maxAge: SESSION_CONFIG.MAX_AGE,
    updateAge: SESSION_CONFIG.UPDATE_AGE,
  },

  debug: process.env.NODE_ENV === "development",
  providers,
  pages: {
    error: AUTH_ROUTES.AUTH_ERROR, // Custom error page
    signIn: AUTH_ROUTES.LOGIN, // Custom sign-in page
    // newUser: AUTH_ROUTES.REGISTER, // New users will be directed here on first sign in
  },

  // * CREDENTIALS WORKAROUND: Custom JWT encode function
  // This is the key to making Credentials work with database sessions.
  // When a credentials login occurs, we:
  // 1. Detect it via the `credentials` flag in the token
  // 2. Manually create a session in the database using the adapter
  // 3. Return the sessionToken instead of encoding a JWT
  jwt: {
    encode: async function (params) {
      // Check if this is a credentials login (set in jwt callback)
      if (params.token?.credentials) {
        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        // Ensure adapter and createSession method exist
        if (!adapter || !adapter.createSession) {
          throw new Error("Database adapter not properly configured");
        }

        const sessionToken = uuid();

        try {
          // Manually create session in database using adapter
          const createdSession = await adapter.createSession({
            sessionToken: sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + SESSION_CONFIG.MAX_AGE * 1000),
          });

          if (!createdSession) {
            throw new Error("Failed to create session");
          }

          // Return the session token instead of a JWT
          return sessionToken;
        } catch (error) {
          console.error("Session creation failed:", error);
          throw new Error("Failed to create database session");
        }
      }

      // For all other providers (OAuth), use default JWT encoding
      return defaultEncode(params);
    },
  },

  callbacks: {
    // JWT CALLBACK: Flag credentials provider
    // This runs for ALL providers and helps us identify credentials logins
    async jwt({ token, user, account }) {
      // Flag credentials provider logins for custom handling in jwt.encode
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },

    // SESSION CALLBACK: Extract user data from database
    // This runs for database sessions and provides user data to the session
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});