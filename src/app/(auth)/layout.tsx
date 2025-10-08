import { auth } from '@/auth';
import { DEFAULT_AUTHENTICATED_ROUTE } from '@/lib/auth/constants/auth.constants';
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
    redirect(DEFAULT_AUTHENTICATED_ROUTE);
  }

  return <AuthClientLayout>{children}</AuthClientLayout>;
}
