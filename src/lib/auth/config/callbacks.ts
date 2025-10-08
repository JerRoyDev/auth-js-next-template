/**
 * * Auth.js Callbacks Configuration
 * 
 * Callbacks are asynchronous functions you can use to control what happens
 * when an action is performed. They allow you to implement access controls
 * and to save the session or user data.
 */

import type { NextAuthConfig } from 'next-auth';

export const authCallbacks: NextAuthConfig['callbacks'] = {
  // JWT CALLBACK: Flag credentials provider
  // This runs for ALL providers and helps us identify credentials logins
  async jwt({ token, account }) {
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
};