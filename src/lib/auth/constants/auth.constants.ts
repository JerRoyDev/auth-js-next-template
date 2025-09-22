// ** Authentication Roles ** //
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

// Type for user roles (should maybe be moved to user types later)
export type UserRole = keyof typeof USER_ROLES;

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';

// ** Authentication Routes ** //
export const AUTH_ROUTES = {
  LOGIN: '/signin',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  UNAUTHORIZED: '/unauthorized',
  AUTH_ERROR: '/error',
};

// ** Authentication Messages ** //
export const AUTH_MESSAGES = {
  // Error messages
  ERROR_DEFAULT: 'Something went wrong. Please try again.',
  ERROR_INVALID_INPUT: 'Invalid input. Please check your details and try again.',
  ERROR_INVALID_CREDENTIALS: 'Incorrect email or password.',
  ERROR_MISSING_FIELDS: 'Please fill in all required fields.',
  ERROR_EMAIL_REQUIRED: 'Email address is required.',
  ERROR_EMAIL_INVALID: 'Invalid email format.',
  ERROR_EMAIL_EXISTS: 'A user with this email already exists.',
  ERROR_EMAIL_EXISTS_OAUTH: 'This email is already registered via another service (e.g. Google). Try logging in with that instead.',
  ERROR_REGISTRATION_FAILED: 'Registration failed.',
  ERROR_LOGIN_FAILED: 'Login failed.',
  ERROR_GOOGLE_SIGNIN_FAILED: 'Google sign-in failed.',
  ERROR_PASSWORD_MISMATCH: 'Passwords do not match.',
  ERROR_PASSWORD_REQUIRED: 'Password is required.',
  ERROR_PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters.',
  ERROR_PASSWORD_MAX_LENGTH: 'Password must not exceed 100 characters.',
  ERROR_PASSWORD_UPPERCASE: 'Password must contain at least one uppercase letter.',
  ERROR_PASSWORD_LOWERCASE: 'Password must contain at least one lowercase letter.',
  ERROR_PASSWORD_NUMBER: 'Password must contain at least one number.',
  ERROR_PASSWORD_SPECIAL: 'Password must contain at least one special character.',
  ERROR_NAME_MIN_LENGTH: 'Name must be at least 2 characters.',
  ERROR_NAME_MAX_LENGTH: 'Name must not exceed 50 characters.',
  ERROR_UNAUTHORIZED: 'You are not authorized to view this page.',
  ERROR_VERIFICATION_EMAIL_FAILED: 'Could not send verification email.',
  ERROR_INVALID_TOKEN: 'Invalid or expired verification link.',
  ERROR_ALREADY_VERIFIED: 'Your email is already verified.',
  ERROR_EMAIL_NOT_VERIFIED: 'Your email has not been verified. Please check your email for a verification link or request a new one.',

  // ** Auth.js Error Messages ** //
  // Sign-in related errors (shown on sign-in page)
  ERROR_OAUTH_ACCOUNT_NOT_LINKED: 'This email is already registered with another sign-in method. Please use the correct provider below.',
  ERROR_OAUTH_CALLBACK: 'There was a problem with the sign-in process. Please try again.',
  ERROR_OAUTH_SIGNIN: 'Could not sign in with this provider. Please try again.',
  ERROR_EMAIL_SIGNIN: 'Could not send sign-in email. Please check your email address.',
  ERROR_CREDENTIALS_SIGNIN: 'Invalid credentials. Please check your email and password.',
  ERROR_ACCOUNT_NOT_LINKED: 'Your account is not linked to this sign-in method.',
  ERROR_MISSING_CSRF: 'Security error. Please refresh the page and try again.',

  // Configuration/System errors (shown on error page)
  ERROR_ACCESS_DENIED: 'Access denied. You do not have permission to sign in.',
  ERROR_CONFIGURATION: 'Authentication service is misconfigured. Please contact support.',
  ERROR_CALLBACK_ROUTE: 'Authentication callback failed. Please try again.',
  ERROR_ADAPTER: 'Database error occurred. Please try again later.',
  ERROR_JWT_SESSION: 'Session error occurred. Please sign in again.',
  ERROR_SESSION_TOKEN: 'Session expired. Please sign in again.',
  ERROR_INVALID_CALLBACK_URL: 'Invalid redirect URL. Possible security issue detected.',
  ERROR_INVALID_CHECK: 'Security check failed. Please try again.',
  ERROR_INVALID_ENDPOINTS: 'Authentication provider is misconfigured.',
  ERROR_INVALID_PROVIDER: 'Unknown or unsupported authentication provider.',
  ERROR_MISSING_ADAPTER: 'Database adapter is not configured.',
  ERROR_MISSING_ADAPTER_METHODS: 'Database adapter is incomplete.',
  ERROR_MISSING_AUTHORIZE: 'Credentials provider is misconfigured.',
  ERROR_MISSING_SECRET: 'Authentication secret is not configured.',
  ERROR_OAUTH_PROFILE_PARSE: 'Could not parse profile information from provider.',
  ERROR_VERIFICATION: 'Email verification failed. Please try again.',
  ERROR_SIGNIN_GENERIC: 'Sign-in failed. Please try again.',
  ERROR_SIGNOUT: 'Sign-out failed. Please try again.',
  ERROR_UNKNOWN_ACTION: 'Unknown authentication action requested.',
  ERROR_UNSUPPORTED_STRATEGY: 'Authentication strategy is not supported.',
  ERROR_UNTRUSTED_HOST: 'Untrusted host detected. Please contact support.',
  ERROR_ERROR_PAGE_LOOP: 'Error page loop detected. Please contact support.',
  ERROR_EVENT: 'Authentication event processing failed.',
  ERROR_EXPERIMENTAL_FEATURE: 'Experimental feature is not enabled.',
  ERROR_DUPLICATE_CONDITIONAL_UI: 'Multiple conditional UI providers detected.',
  ERROR_MISSING_WEBAUTHN_AUTOCOMPLETE: 'WebAuthn autocomplete is not configured.',
  ERROR_WEBAUTHN_VERIFICATION: 'WebAuthn verification failed.',

  // Success messages
  SUCCESS_REGISTRATION: 'Registration successful!',
  SUCCESS_REGISTRATION_VERIFICATION_SENT: 'Registration successful! A verification email has been sent to your email address.',
  SUCCESS_LOGIN: 'Login successful!',
  SUCCESS_VERIFICATION: 'Your email has been verified! You can now log in.',
  SUCCESS_REGISTRATION_FOR_EMAIL: (email: string) => `Registration successful for ${email}!`,

  // Info messages
  INFO_VERIFICATION_EMAIL_SENT: 'A verification email has been sent. Please check your inbox.',
  INFO_CHECK_EMAIL_FOR_VERIFICATION: 'Please check your email for a verification link.',

  // Other
  INFO_REGISTRATION_REDIRECT: 'Registration successful! Redirecting to login...',
  TEXT_LOGGING_IN: 'Logging in...',
  TEXT_REGISTERING: 'Registering...',
  TEXT_PROCESSING: 'Processing...',
  TEXT_VERIFYING: 'Verifying...',
} as const;