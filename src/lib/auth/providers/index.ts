/**
 * Provider Utilities for Better Auth
 * 
 * This file provides helper functions and constants for working with
 * Better Auth providers in UI components.
 */

import { authConfig } from '../config/auth.config';

/**
 * Get the list of enabled OAuth providers
 */
export function getEnabledOAuthProviders() {
  const providers = [];

  if (authConfig.socialProviders?.google?.enabled) {
    providers.push({ id: 'google', name: 'Google' });
  }
  if (authConfig.socialProviders?.github?.enabled) {
    providers.push({ id: 'github', name: 'GitHub' });
  }
  if (authConfig.socialProviders?.discord?.enabled) {
    providers.push({ id: 'discord', name: 'Discord' });
  }
  if (authConfig.socialProviders?.facebook?.enabled) {
    providers.push({ id: 'facebook', name: 'Facebook' });
  }

  return providers;
}

/**
 * Check if email/password authentication is enabled
 */
export function isEmailPasswordEnabled() {
  return authConfig.emailAndPassword?.enabled ?? false;
}

/**
 * Get all enabled authentication methods
 */
export function getAllEnabledProviders() {
  const providers = [];

  if (isEmailPasswordEnabled()) {
    providers.push({ id: 'credentials', name: 'Email & Password' });
  }

  providers.push(...getEnabledOAuthProviders());

  return providers;
}

// Export for backward compatibility with existing components
export { providerMap } from '../config/auth.config';
