import { SESSION_CONFIG } from "../constants/auth.constants";

/**
 * * Session Configuration for Auth.js
 * 
 * DATABASE SESSION STRATEGY WITH CREDENTIALS WORKAROUND
 * This configuration enables database sessions for ALL providers,
 * including the Credentials provider through a custom JWT encode workaround.
 */
export const sessionConfig = {
  strategy: "database" as const,
  maxAge: SESSION_CONFIG.MAX_AGE,
  updateAge: SESSION_CONFIG.UPDATE_AGE,
};