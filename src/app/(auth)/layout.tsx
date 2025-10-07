import { auth } from '@/lib/auth/config/auth.config';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';
import { redirect } from 'next/navigation';
import AuthClientLayout from './AuthClientLayout'; // Import the new client component

/**
 * Server component layout for authentication pages.
 * It checks for an active session and redirects if the user is already logged in.
 * It then wraps the page content with the client-side layout for styling.
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect(AUTH_ROUTES.DEFAULT_AUTHENTICATED_ROUTE);
  }

  return <AuthClientLayout>{children}</AuthClientLayout>;
}
