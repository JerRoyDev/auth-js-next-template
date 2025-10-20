import AuthClientLayout from './AuthClientLayout';
import { isAuth } from '@/lib/auth/utils/require-auth';
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';

/**
 * Server component layout for authentication pages.
 * It checks for an active session and redirects if the user is already logged in.
 * It then wraps the page content with the client-side layout for styling.
 */
const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  // Check if the user is already authenticated and redirect to user landing for authenticated users
  await isAuth(PROTECTED_ROUTES.USER_LANDING);

  return <AuthClientLayout>{children}</AuthClientLayout>;
};

export default AuthLayout;
