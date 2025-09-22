import { AUTH_MESSAGES } from '../constants/auth.constants';

/**
 * Auth.js Error Handler
 * 
 * Handles all Auth.js error types and provides appropriate user messages.
 * Based on: https://authjs.dev/reference/core/errors
 */

// Auth.js Error Types (from official docs)
export type AuthErrorType =
  // Sign-in related errors (redirect to sign-in page)
  | 'OAuthAccountNotLinked'
  | 'OAuthCallbackError'
  | 'OAuthSignInError'
  | 'EmailSignInError'
  | 'CredentialsSignin'
  | 'AccountNotLinked'
  | 'MissingCSRF'

  // Configuration/System errors (redirect to error page)
  | 'AccessDenied'
  | 'Configuration'
  | 'CallbackRouteError'
  | 'AdapterError'
  | 'JWTSessionError'
  | 'SessionTokenError'
  | 'InvalidCallbackUrl'
  | 'InvalidCheck'
  | 'ErrorPageLoop'
  | 'EventError'
  | 'InvalidEndpoints'
  | 'InvalidProvider'
  | 'MissingAdapter'
  | 'MissingAdapterMethods'
  | 'MissingAuthorize'
  | 'MissingSecret'
  | 'OAuthProfileParseError'
  | 'Verification'
  | 'SignOutError'
  | 'UnknownAction'
  | 'UnsupportedStrategy'
  | 'UntrustedHost'
  | 'DuplicateConditionalUI'
  | 'MissingWebAuthnAutocomplete'
  | 'WebAuthnVerificationError'
  | 'ExperimentalFeatureNotEnabled'

  // Generic fallback
  | 'Default';

/**
 * Error Context Interface
 */
export interface AuthErrorContext {
  error: AuthErrorType;
  provider?: string;
  email?: string;
  message?: string;
}

/**
 * Error Display Information
 */
export interface ErrorDisplayInfo {
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  showOnPage: 'signin' | 'error' | 'both';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Get user-friendly error message from Auth.js error type
 */
export function getAuthErrorMessage(context: AuthErrorContext): ErrorDisplayInfo {
  const { error, provider, email } = context;

  switch (error) {
    // === SIGN-IN PAGE ERRORS (User-recoverable) ===
    case 'OAuthAccountNotLinked':
      return {
        title: 'Account Already Exists',
        message: email
          ? `The email ${email} is already registered${provider ? ` with ${provider}` : ''}. Please sign in with the correct provider below.`
          : AUTH_MESSAGES.ERROR_OAUTH_ACCOUNT_NOT_LINKED,
        type: 'warning',
        showOnPage: 'signin',
        severity: 'medium'
      };

    case 'OAuthCallbackError':
      return {
        title: 'Sign-in Failed',
        message: provider
          ? `There was a problem signing in with ${provider}. Please try again.`
          : AUTH_MESSAGES.ERROR_OAUTH_CALLBACK,
        type: 'error',
        showOnPage: 'signin',
        severity: 'medium'
      };

    case 'OAuthSignInError':
      return {
        title: 'Provider Error',
        message: provider
          ? `Could not sign in with ${provider}. Please try again.`
          : AUTH_MESSAGES.ERROR_OAUTH_SIGNIN,
        type: 'error',
        showOnPage: 'signin',
        severity: 'medium'
      };

    case 'EmailSignInError':
      return {
        title: 'Email Sign-in Failed',
        message: AUTH_MESSAGES.ERROR_EMAIL_SIGNIN,
        type: 'error',
        showOnPage: 'signin',
        severity: 'medium'
      };

    case 'CredentialsSignin':
      return {
        title: 'Invalid Credentials',
        message: AUTH_MESSAGES.ERROR_CREDENTIALS_SIGNIN,
        type: 'error',
        showOnPage: 'signin',
        severity: 'low'
      };

    case 'AccountNotLinked':
      return {
        title: 'Account Not Linked',
        message: AUTH_MESSAGES.ERROR_ACCOUNT_NOT_LINKED,
        type: 'warning',
        showOnPage: 'signin',
        severity: 'medium'
      };

    case 'MissingCSRF':
      return {
        title: 'Security Error',
        message: AUTH_MESSAGES.ERROR_MISSING_CSRF,
        type: 'error',
        showOnPage: 'signin',
        severity: 'high'
      };

    // === ERROR PAGE ERRORS (System/Configuration) ===
    case 'AccessDenied':
      return {
        title: 'Access Denied',
        message: AUTH_MESSAGES.ERROR_ACCESS_DENIED,
        type: 'error',
        showOnPage: 'error',
        severity: 'medium'
      };

    case 'Configuration':
      return {
        title: 'Configuration Error',
        message: AUTH_MESSAGES.ERROR_CONFIGURATION,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'CallbackRouteError':
      return {
        title: 'Callback Error',
        message: AUTH_MESSAGES.ERROR_CALLBACK_ROUTE,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'AdapterError':
      return {
        title: 'Database Error',
        message: AUTH_MESSAGES.ERROR_ADAPTER,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'JWTSessionError':
      return {
        title: 'Session Error',
        message: AUTH_MESSAGES.ERROR_JWT_SESSION,
        type: 'error',
        showOnPage: 'both',
        severity: 'medium'
      };

    case 'SessionTokenError':
      return {
        title: 'Session Expired',
        message: AUTH_MESSAGES.ERROR_SESSION_TOKEN,
        type: 'warning',
        showOnPage: 'both',
        severity: 'medium'
      };

    case 'InvalidCallbackUrl':
      return {
        title: 'Security Warning',
        message: AUTH_MESSAGES.ERROR_INVALID_CALLBACK_URL,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'InvalidCheck':
      return {
        title: 'Security Check Failed',
        message: AUTH_MESSAGES.ERROR_INVALID_CHECK,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'ErrorPageLoop':
      return {
        title: 'System Error',
        message: AUTH_MESSAGES.ERROR_ERROR_PAGE_LOOP,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'EventError':
      return {
        title: 'Event Processing Error',
        message: AUTH_MESSAGES.ERROR_EVENT,
        type: 'error',
        showOnPage: 'error',
        severity: 'medium'
      };

    case 'InvalidEndpoints':
      return {
        title: 'Provider Configuration Error',
        message: AUTH_MESSAGES.ERROR_INVALID_ENDPOINTS,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'InvalidProvider':
      return {
        title: 'Unknown Provider',
        message: AUTH_MESSAGES.ERROR_INVALID_PROVIDER,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'MissingAdapter':
      return {
        title: 'Database Not Configured',
        message: AUTH_MESSAGES.ERROR_MISSING_ADAPTER,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'MissingAdapterMethods':
      return {
        title: 'Database Configuration Incomplete',
        message: AUTH_MESSAGES.ERROR_MISSING_ADAPTER_METHODS,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'MissingAuthorize':
      return {
        title: 'Credentials Provider Misconfigured',
        message: AUTH_MESSAGES.ERROR_MISSING_AUTHORIZE,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'MissingSecret':
      return {
        title: 'Authentication Secret Missing',
        message: AUTH_MESSAGES.ERROR_MISSING_SECRET,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'OAuthProfileParseError':
      return {
        title: 'Profile Parse Error',
        message: provider
          ? `Could not parse profile information from ${provider}.`
          : AUTH_MESSAGES.ERROR_OAUTH_PROFILE_PARSE,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'Verification':
      return {
        title: 'Verification Failed',
        message: AUTH_MESSAGES.ERROR_VERIFICATION,
        type: 'error',
        showOnPage: 'error',
        severity: 'medium'
      };

    case 'SignOutError':
      return {
        title: 'Sign-out Failed',
        message: AUTH_MESSAGES.ERROR_SIGNOUT,
        type: 'error',
        showOnPage: 'error',
        severity: 'low'
      };

    case 'UnknownAction':
      return {
        title: 'Unknown Action',
        message: AUTH_MESSAGES.ERROR_UNKNOWN_ACTION,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'UnsupportedStrategy':
      return {
        title: 'Unsupported Strategy',
        message: AUTH_MESSAGES.ERROR_UNSUPPORTED_STRATEGY,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'UntrustedHost':
      return {
        title: 'Untrusted Host',
        message: AUTH_MESSAGES.ERROR_UNTRUSTED_HOST,
        type: 'error',
        showOnPage: 'error',
        severity: 'critical'
      };

    case 'DuplicateConditionalUI':
      return {
        title: 'Configuration Error',
        message: AUTH_MESSAGES.ERROR_DUPLICATE_CONDITIONAL_UI,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'MissingWebAuthnAutocomplete':
      return {
        title: 'WebAuthn Configuration Error',
        message: AUTH_MESSAGES.ERROR_MISSING_WEBAUTHN_AUTOCOMPLETE,
        type: 'error',
        showOnPage: 'error',
        severity: 'high'
      };

    case 'WebAuthnVerificationError':
      return {
        title: 'WebAuthn Verification Failed',
        message: AUTH_MESSAGES.ERROR_WEBAUTHN_VERIFICATION,
        type: 'error',
        showOnPage: 'signin',
        severity: 'medium'
      };

    case 'ExperimentalFeatureNotEnabled':
      return {
        title: 'Feature Not Available',
        message: AUTH_MESSAGES.ERROR_EXPERIMENTAL_FEATURE,
        type: 'error',
        showOnPage: 'error',
        severity: 'medium'
      };

    // === DEFAULT FALLBACK ===
    case 'Default':
    default:
      return {
        title: 'Authentication Error',
        message: AUTH_MESSAGES.ERROR_DEFAULT,
        type: 'error',
        showOnPage: 'error',
        severity: 'medium'
      };
  }
}

/**
 * Check if error should be displayed on sign-in page
 */
export function shouldDisplayOnSignInPage(error: AuthErrorType): boolean {
  const errorInfo = getAuthErrorMessage({ error });
  return errorInfo.showOnPage === 'signin' || errorInfo.showOnPage === 'both';
}

/**
 * Check if error should be displayed on error page
 */
export function shouldDisplayOnErrorPage(error: AuthErrorType): boolean {
  const errorInfo = getAuthErrorMessage({ error });
  return errorInfo.showOnPage === 'error' || errorInfo.showOnPage === 'both';
}

/**
 * Get CSS classes for error display based on type and severity
 */
export function getErrorDisplayClasses(errorInfo: ErrorDisplayInfo): string {
  const baseClasses = 'p-4 rounded-md border';

  // Type-based styling
  const typeClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  // Severity-based additional styling
  const severityClasses = {
    low: '',
    medium: 'border-l-4',
    high: 'border-l-4 shadow-md',
    critical: 'border-l-4 shadow-lg'
  };

  return `${baseClasses} ${typeClasses[errorInfo.type]} ${severityClasses[errorInfo.severity]}`;
}

/**
 * Parse error from URL search params or error string
 */
export function parseAuthError(errorParam: string | null): AuthErrorType {
  if (!errorParam) return 'Default';

  // Auth.js error types mapping
  const errorMap: Record<string, AuthErrorType> = {
    'OAuthAccountNotLinked': 'OAuthAccountNotLinked',
    'OAuthCallbackError': 'OAuthCallbackError',
    'OAuthSignInError': 'OAuthSignInError',
    'EmailSignInError': 'EmailSignInError',
    'CredentialsSignin': 'CredentialsSignin',
    'AccountNotLinked': 'AccountNotLinked',
    'MissingCSRF': 'MissingCSRF',
    'AccessDenied': 'AccessDenied',
    'Configuration': 'Configuration',
    'CallbackRouteError': 'CallbackRouteError',
    'AdapterError': 'AdapterError',
    'JWTSessionError': 'JWTSessionError',
    'SessionTokenError': 'SessionTokenError',
    'InvalidCallbackUrl': 'InvalidCallbackUrl',
    'InvalidCheck': 'InvalidCheck',
    'ErrorPageLoop': 'ErrorPageLoop',
    'EventError': 'EventError',
    'InvalidEndpoints': 'InvalidEndpoints',
    'InvalidProvider': 'InvalidProvider',
    'MissingAdapter': 'MissingAdapter',
    'MissingAdapterMethods': 'MissingAdapterMethods',
    'MissingAuthorize': 'MissingAuthorize',
    'MissingSecret': 'MissingSecret',
    'OAuthProfileParseError': 'OAuthProfileParseError',
    'Verification': 'Verification',
    'SignOutError': 'SignOutError',
    'UnknownAction': 'UnknownAction',
    'UnsupportedStrategy': 'UnsupportedStrategy',
    'UntrustedHost': 'UntrustedHost',
    'DuplicateConditionalUI': 'DuplicateConditionalUI',
    'MissingWebAuthnAutocomplete': 'MissingWebAuthnAutocomplete',
    'WebAuthnVerificationError': 'WebAuthnVerificationError',
    'ExperimentalFeatureNotEnabled': 'ExperimentalFeatureNotEnabled'
  };

  return errorMap[errorParam] || 'Default';
}
