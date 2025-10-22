/**
 * Error object structure returned from Better Auth API calls
 */
export interface BetterAuthError {
  code?: string;
  message?: string;
  status?: number;
  statusText?: string;
  type?: 'error' | 'info' | 'warning';
}

/**
 * Props for AuthForm component
 */
export interface AuthFormProps {
  mode: 'signin' | 'register';
}

/**
 * Props for CredentialsForm component
 */
export interface CredentialsFormProps {
  mode: 'signin' | 'register';
  callbackUrl?: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setAuthStatusObj: (errorObj: BetterAuthError | null) => void;
}