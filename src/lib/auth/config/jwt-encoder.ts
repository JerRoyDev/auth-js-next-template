import { encode as defaultEncode, type JWTEncodeParams } from "next-auth/jwt";
import { v4 as uuid } from "uuid";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { SESSION_CONFIG } from "../constants/auth.constants";

// Create adapter instance to be used in jwt.encode
const adapter = PrismaAdapter(prisma);

/**
 * * Custom JWT encode function for Credentials provider workaround
 * 
 * This is the key to making Credentials work with database sessions.
 * When a credentials login occurs, we:
 * 1. Detect it via the `credentials` flag in the token
 * 2. Manually create a session in the database using the adapter
 * 3. Return the sessionToken instead of encoding a JWT
 */
export const customJwtEncode = async function (params: JWTEncodeParams) {
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
};

// Export the adapter for use in the main config
export { adapter };