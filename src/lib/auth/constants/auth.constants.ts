export const DEFAULT_LOGIN_REDIRECT = '/overview';

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  UNAUTHORIZED: '/unauthorized',
  AUTH_ERROR: '/auth/error',
};

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