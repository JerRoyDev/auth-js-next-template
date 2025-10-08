import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AuthClientLayout from './AuthClientLayout'; // Import the new client component
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';

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
    redirect(PROTECTED_ROUTES.USER_LANDING);
  }

  return <AuthClientLayout>{children}</AuthClientLayout>;
}
