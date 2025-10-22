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
  USER_NOT_FOUND: {
    title: 'User Not Found',
    message: 'No user was found with the provided credentials.',
    type: 'error',
    severity: 'medium',
  },
  FAILED_TO_CREATE_USER: {
    title: 'User Creation Failed',
    message: 'Could not create user. Please try again.',
    type: 'error',
    severity: 'high',
  },
  FAILED_TO_CREATE_SESSION: {
    title: 'Session Creation Failed',
    message: 'Could not create session. Please try again.',
    type: 'error',
    severity: 'high',
  },
  FAILED_TO_UPDATE_USER: {
    title: 'User Update Failed',
    message: 'Could not update user information.',
    type: 'error',
    severity: 'medium',
  },
  FAILED_TO_GET_SESSION: {
    title: 'Session Retrieval Failed',
    message: 'Could not retrieve session. Please log in again.',
    type: 'error',
    severity: 'medium',
  },
  INVALID_PASSWORD: {
    title: 'Invalid Password',
    message: 'The password you entered is incorrect.',
    type: 'error',
    severity: 'medium',
  },
  INVALID_EMAIL: {
    title: 'Invalid Email',
    message: 'The email address is not valid.',
    type: 'error',
    severity: 'low',
  },
  INVALID_EMAIL_OR_PASSWORD: {
    title: 'Invalid Credentials',
    message: 'Invalid email or password.',
    type: 'error',
    severity: 'medium',
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    title: 'Account Already Linked',
    message: 'This social account is already linked to another user.',
    type: 'info',
    severity: 'low',
  },
  PROVIDER_NOT_FOUND: {
    title: 'Provider Not Found',
    message: 'The specified provider could not be found.',
    type: 'error',
    severity: 'medium',
  },
  INVALID_TOKEN: {
    title: 'Invalid Token',
    message: 'The token provided is invalid or expired.',
    type: 'error',
    severity: 'medium',
  },
  ID_TOKEN_NOT_SUPPORTED: {
    title: 'ID Token Not Supported',
    message: 'The id_token is not supported by this provider.',
    type: 'error',
    severity: 'low',
  },
  FAILED_TO_GET_USER_INFO: {
    title: 'User Info Retrieval Failed',
    message: 'Could not retrieve user information.',
    type: 'error',
    severity: 'medium',
  },
  USER_EMAIL_NOT_FOUND: {
    title: 'User Email Not Found',
    message: 'No email address found for this user.',
    type: 'error',
    severity: 'low',
  },
  EMAIL_NOT_VERIFIED: {
    title: 'Email Not Verified',
    message: 'Please verify your email before signing in.',
    type: 'warning',
    severity: 'low',
  },
  PASSWORD_TOO_SHORT: {
    title: 'Password Too Short',
    message: 'Your password is too short.',
    type: 'error',
    severity: 'low',
  },
  PASSWORD_TOO_LONG: {
    title: 'Password Too Long',
    message: 'Your password is too long.',
    type: 'error',
    severity: 'low',
  },
  USER_ALREADY_EXISTS: {
    title: 'User Already Exists',
    message: 'A user with this email already exists.',
    type: 'info',
    severity: 'low',
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    title: 'Email Already Registered',
    message: 'User already exists. Use another email.',
    type: 'info',
    severity: 'low',
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    title: 'Email Update Failed',
    message: 'Email address cannot be updated.',
    type: 'error',
    severity: 'low',
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    title: 'Credential Account Not Found',
    message: 'No credential account found for this user.',
    type: 'error',
    severity: 'low',
  },
  SESSION_EXPIRED: {
    title: 'Session Expired',
    message: 'Session expired. Re-authenticate to perform this action.',
    type: 'warning',
    severity: 'medium',
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    title: 'Unlink Failed',
    message: 'You can\'t unlink your last account.',
    type: 'error',
    severity: 'low',
  },
  ACCOUNT_NOT_FOUND: {
    title: 'Account Not Found',
    message: 'No account found with the provided information.',
    type: 'error',
    severity: 'low',
  },
  USER_ALREADY_HAS_PASSWORD: {
    title: 'User Already Has Password',
    message: 'User already has a password. Provide that to delete the account.',
    type: 'info',
    severity: 'low',
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