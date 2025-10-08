import { AUTH_ROUTES, PUBLIC_ROUTES } from "../constants/auth.constants";
import { providers } from "../providers/provider-map";
import { adapter, customJwtEncode } from "./jwt-encoder";
import { authCallbacks } from "./callbacks";
import { sessionConfig } from "./session.config";

/**
 * * Auth.js v5 config: Multi OAuth providers with dynamic rendering.
 * 
 * Refactored for better separation of concerns:
 * - Providers are configured in separate files
 * - JWT encoding logic is in its own module
 * - Callbacks are externalized for reusability
 */

// Re-export provider map for backward compatibility
export { providerMap } from "../providers/provider-map";

export const authConfig = {
  adapter,
  session: sessionConfig,
  debug: process.env.NODE_ENV === "development",
  providers,
  pages: {
    error: PUBLIC_ROUTES.ERROR, // Custom error page
    signIn: AUTH_ROUTES.LOGIN, // Custom sign-in page
    // newUser: AUTH_ROUTES.NEW_USER // New users will be directed here on first sign in
  },
  jwt: {
    encode: customJwtEncode,
  },
  callbacks: authCallbacks,
};

