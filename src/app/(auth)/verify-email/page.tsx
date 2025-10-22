// Email verification page for Better Auth
// Shows status and allows resending verification email
// All text/comments in English

'use client';

import { verifyEmailToken } from '@/lib/auth/actions/verifyEmail.action';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth/config/auth-client';
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from '@/lib/auth/constants/auth.constants';
// Remove direct prisma usage in client component

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationSent = searchParams.get('verification_sent') === 'true';
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // State for UI feedback
  const [status, setStatus] = useState<'valid' | 'expired' | 'unknown'>(
    'unknown'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check for required query param
  useEffect(() => {
    if (!verificationSent) {
      router.replace(AUTH_ROUTES.LOGIN);
    }
  }, [verificationSent, router]);

  // Validate verification token via server action

  (useEffect(() => {
    async function checkToken() {
      if (!token || !email) {
        setStatus('unknown');
        return;
      }
      try {
        const result = await verifyEmailToken({ email, token });
        if (result.valid) {
          setStatus('valid');
        } else if (result.reason === 'Token expired') {
          setStatus('expired');
        } else {
          setStatus('unknown');
        }
      } catch {
        setStatus('unknown');
      }
    }
    checkToken();
  }),
    [token, email]);

  // Handler for resending verification email
  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authClient.sendVerificationEmail({
        email: email as string,
        // callbackURL: PROTECTED_ROUTES.USER_LANDING,
      });
      setSuccess(
        'A new verification email has been sent. Please check your inbox and spam folder.'
      );
    } catch (err: any) {
      setError('Failed to send verification email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-12 bg-card p-8 rounded-lg shadow-lg border border-border text-center'>
      <h1 className='text-2xl font-bold mb-4'>Email Verification</h1>
      {status === 'valid' && (
        <>
          <p className='mb-4 text-muted-foreground'>
            A verification email has been sent to{' '}
            <span className='font-semibold'>{email}</span>.<br />
            Please check your inbox and spam folder.
          </p>
          <button
            className='mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50'
            onClick={handleResend}
            disabled={loading}
          >
            Resend verification email
          </button>
        </>
      )}
      {status === 'expired' && (
        <>
          <p className='mb-4 text-destructive'>
            Your verification link has expired.
            <br />
            You can request a new verification email below.
          </p>
          <button
            className='mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50'
            onClick={handleResend}
            disabled={loading}
          >
            Resend verification email
          </button>
        </>
      )}
      {status === 'unknown' && (
        <p className='mb-4 text-muted-foreground'>
          Unable to determine verification status. Please try again or contact
          support.
        </p>
      )}
      {success && <p className='mt-4 text-green-600'>{success}</p>}
      {error && <p className='mt-4 text-destructive'>{error}</p>}
    </div>
  );
}
