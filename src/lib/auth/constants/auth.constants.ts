import { Role } from "@prisma/client";

// ** Authentication Roles ** //

// Labels for roles (for display purposes) (should match the Role enum in Prisma schema)
export const ROLE_LABELS: Record<Role, string> = {
  USER: 'Användare',
  ADMIN: 'Administratör',
  // Add more roles here as needed
};

// ** Session Configuration ** //
export const SESSION_CONFIG = {
  // Balanced approach - suitable for most web applications
  MAX_AGE: 7 * 24 * 60 * 60, // 7 days in seconds
  UPDATE_AGE: 60 * 60, // 1 hour in seconds

  // More secure - suitable for highly sensitive applications
  // MAX_AGE: 24 * 60 * 60, // 1 day in seconds
  // UPDATE_AGE: 15 * 60, // 15 minutes in seconds

  // More convenient - suitable for low-risk applications
  // MAX_AGE: 30 * 24 * 60 * 60, // 30 days in seconds
  // UPDATE_AGE: 24 * 60 * 60, // 24 hours in seconds

} as const;

// ** Route Definitions ** //

// The default redirect path after a user logs in.
export const DEFAULT_AUTHENTICATED_ROUTE = '/dashboard';

// These routes do not require authentication and will not trigger redirects.
export const PUBLIC_ROUTES = {
  HOME: '/',
  UNAUTHORIZED: '/unauthorized',
  ERROR: '/error',
} as const;

// Logged-in users will be redirected to the PROTECTED_ROUTES.USER_LANDING.
export const AUTH_ROUTES = {
  LOGIN: '/signin',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
};

// Routes that require authentication.
export const PROTECTED_ROUTES = {
  USER_LANDING: DEFAULT_AUTHENTICATED_ROUTE, /* could be dashboard, Overview etc. */
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  USER_SETTINGS: '/settings',
  USER_PROFILE: '/profile',
}


// ** Better Auth Error Messages (Swedish) ** //
// Maps stable `better-auth` error codes to user-friendly messages.
export const BETTER_AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Credentials
  'invalid-credentials': 'Felaktig e-postadress eller lösenord.',
  'user-not-found': 'Användaren kunde inte hittas.',
  'user-already-exists': 'En användare med denna e-postadress finns redan.',
  'USER_ALREADY_EXISTS': 'En användare med denna e-postadress finns redan.',

  // OAuth
  'oauth-error': 'Inloggningen med den valda tjänsten misslyckades. Försök igen.',
  'oauth_error': 'Inloggningen med den valda tjänsten misslyckades. Försök igen.',
  'oauth-account-not-linked': 'Denna e-post är redan kopplad till en annan inloggningsmetod.',
  'access-denied': 'Åtkomst nekades. Du måste ge tillstånd för att logga in.',
  'callback-error': 'Ett fel uppstod under inloggningen. Försök igen.',

  // General
  'invalid-input': 'Ogiltig indata. Vänligen kontrollera dina uppgifter.',
  'unknown-error': 'Ett okänt fel inträffade. Försök igen senare.',
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