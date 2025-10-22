/**
 * Better Auth Error Handler
 * 
 * Handles Better Auth error objects and provides appropriate user messages.
 * See: 
 */

import { BetterAuthError } from "../types";



export interface ErrorDisplayInfo {
  code?: string;
  title: string;
  message: string;
  type: 'error' | 'info' | 'warning';
  severity: 'low' | 'medium' | 'high';
}

/**
 * Maps Better Auth error codes to user-friendly messages and categories.
 */
const BETTER_AUTH_ERROR_MAP: Record<string, Omit<ErrorDisplayInfo, 'code'>> = {
  INVALID_EMAIL_OR_PASSWORD: {
    title: 'Invalid Credentials',
    message: 'Invalid email or password.',
    type: 'error',
    severity: 'medium',
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    title: 'Email Already Registered',
    message: 'An account with this email already exists. Please use another email.',
    type: 'info',
    severity: 'low',
  },
  INVALID_CREDENTIALS: {
    title: 'Invalid Credentials',
    message: 'Incorrect email or password.',
    type: 'error',
    severity: 'medium',
  },
  EMAIL_NOT_VERIFIED: {
    title: 'Email Not Verified',
    message: 'Please verify your email before signing in.',
    type: 'warning',
    severity: 'low',
  },
  ACCOUNT_CREATED: {
    title: 'Account Created',
    message: 'Your account has been created. Please sign in.',
    type: 'info',
    severity: 'low',
  },
  ACCESS_DENIED: {
    title: 'Access Denied',
    message: 'You do not have permission to access this resource.',
    type: 'error',
    severity: 'high',
  },
  DEFAULT: {
    title: 'Authentication Error',
    message: 'An unknown error occurred. Please try again.',
    type: 'error',
    severity: 'medium',
  },
};

/**
 * Get user-friendly error message from Better Auth error object.
 */
export function getBetterAuthStatusMessage(error: BetterAuthError): ErrorDisplayInfo {
  const { code, message, status, statusText, type } = error;

  // Map known error code
  if (code && BETTER_AUTH_ERROR_MAP[code]) {
    return {
      code,
      ...BETTER_AUTH_ERROR_MAP[code],
    };
  }

  // Fallback for unknown error codes or custom API error objects
  let resolvedType: 'error' | 'info' | 'warning' = 'error';
  if (type) {
    resolvedType = type;
  } else if (status === 422 || status === 401 || status === 403) {
    resolvedType = 'error';
  } else if (status === 200) {
    resolvedType = 'info';
  } else if (status === 400) {
    resolvedType = 'warning';
  }

  let severity: 'low' | 'medium' | 'high' = 'medium';
  if (resolvedType === 'error' && status === 403) severity = 'high';
  if (resolvedType === 'warning') severity = 'low';
  if (resolvedType === 'info') severity = 'low';

  return {
    code,
    title: statusText || code || 'Authentication',
    message: message || 'An unknown error occurred. Please try again.',
    type: resolvedType,
    severity,
  };
}

/**
 * Get CSS classes for error display based on type and severity
 */
export function getErrorDisplayClasses(errorInfo: ErrorDisplayInfo): string {
  switch (errorInfo.type) {
    case 'error':
      return 'p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center space-x-2';
    case 'info':
      return 'p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm flex items-center space-x-2';
    case 'warning':
      return 'p-4 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm flex items-center space-x-2';
    default:
      return 'p-4 rounded-lg bg-card border border-border text-foreground text-sm flex items-center space-x-2';
  }
}