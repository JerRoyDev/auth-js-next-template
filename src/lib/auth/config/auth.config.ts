// src/lib/auth/config/auth.config.ts

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { SESSION_CONFIG } from "../constants/auth.constants";
import { admin } from "better-auth/plugins";

/**
 * * Better Auth Configuration
 * 
 * Migrated from Auth.js v5 to Better Auth.
 * Better Auth handles database sessions automatically for all providers,
 * eliminating the need for custom JWT encoding workarounds.
 * 
 * Key differences from Auth.js:
 * - No separate "providers" array - configured inline
 * - No "pages" config - handled by middleware/redirects
 * - No "callbacks" - use hooks instead
 * - Automatic database session handling for credentials
 */

export const authConfig = {
  // Database adapter
  database: prismaAdapter(prisma, {
    provider: "sqlite", // Change to "postgresql", "mysql", or "mongodb" as needed
  }),

  // Email & Password authentication (replaces credentials provider)
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
  },

  // OAuth providers configuration
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      enabled: !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    },
    github: {
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
      enabled: !!(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET),
    },
    discord: {
      clientId: process.env.AUTH_DISCORD_ID || "",
      clientSecret: process.env.AUTH_DISCORD_SECRET || "",
      enabled: !!(process.env.AUTH_DISCORD_ID && process.env.AUTH_DISCORD_SECRET),
    },
    facebook: {
      clientId: process.env.AUTH_FACEBOOK_ID || "",
      clientSecret: process.env.AUTH_FACEBOOK_SECRET || "",
      enabled: !!(process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET),
    },
    // Note: Better Auth may not support Twitter/X yet - check documentation
    // twitter: {
    //   clientId: process.env.AUTH_TWITTER_ID || "",
    //   clientSecret: process.env.AUTH_TWITTER_SECRET || "",
    //   enabled: !!(process.env.AUTH_TWITTER_ID && process.env.AUTH_TWITTER_SECRET),
    // },
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
      defaultRole: "USER", // Default role for new users
      adminRoles: ["ADMIN"], // Roles that are considered admin
      // You can also specify specific user IDs as admins:
      // adminUserIds: ["user-id-1", "user-id-2"],
    }),
  ],
};

// Export a provider map for backward compatibility with UI components
// that need to list available providers dynamically
export const providerMap = [
  { id: "credentials", name: "Email & Password" },
  ...(authConfig.socialProviders?.google?.enabled ? [{ id: "google", name: "Google" }] : []),
  ...(authConfig.socialProviders?.github?.enabled ? [{ id: "github", name: "GitHub" }] : []),
  ...(authConfig.socialProviders?.discord?.enabled ? [{ id: "discord", name: "Discord" }] : []),
  ...(authConfig.socialProviders?.facebook?.enabled ? [{ id: "facebook", name: "Facebook" }] : []),
];

