// src/auth.ts

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './lib/prisma';
import { SESSION_CONFIG } from './lib/auth/constants/auth.constants';
import { admin } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({

  jwtSecret: process.env.AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: 'sqlite', // Eller 'postgresql', 'mysql', etc., beroende på vad du använder.
  }),


  // Email & Password authentication (replaces credentials provider)
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
    minPasswordLength: 8, // Match Zod validation
    maxPasswordLength: 100, // Match Zod validation

  },

  emailVerification: {
    // Configuration for email verification emails
  },

  // Oauth providers
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },

  },
  // Session configuration (using constants from auth.constants.ts)
  session: {
    expiresIn: SESSION_CONFIG.MAX_AGE, // 7 days (from constants)
    updateAge: SESSION_CONFIG.UPDATE_AGE, // 1 hour (from constants)
  },

  // Advanced options
  advanced: {
    cookiePrefix: "better-auth",
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  // Plugins
  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    }),
    // LÄGG TILL nextCookies plugin sist för att säkerställa korrekt cookie-hantering
    nextCookies(),
  ],

});


