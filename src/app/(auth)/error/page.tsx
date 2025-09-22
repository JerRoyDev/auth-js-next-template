'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  parseAuthError,
  getAuthErrorMessage,
  shouldDisplayOnErrorPage,
  getErrorDisplayClasses,
} from '@/lib/auth/utils/error-handler';
import { OAuthButton } from '@/components/auth/OAuthButton';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();

  // Hämta error params från URL
  const errorParam = searchParams.get('error');
  const provider = searchParams.get('provider');
  const email = searchParams.get('email');

  // Parse error och få error info
  const errorType = parseAuthError(errorParam);
  const shouldShow = shouldDisplayOnErrorPage(errorType);

  // Fallback för okänt fel eller fel som inte ska visas här
  if (!errorParam || !shouldShow) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Something went wrong
          </h2>
          <p className='text-gray-600'>
            An authentication error occurred. Please try again.
          </p>
          <Link
            href='/signin'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const errorInfo = getAuthErrorMessage({
    error: errorType,
    provider: provider || undefined,
    email: email || undefined,
  });

  const cssClasses = getErrorDisplayClasses(errorInfo);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            {errorInfo.title}
          </h2>
        </div>

        <div className={cssClasses}>
          <p className='text-sm'>{errorInfo.message}</p>
        </div>

        {/* Visa provider knapp för vissa fel */}
        {errorType === 'OAuthAccountNotLinked' && provider && (
          <div className='space-y-4'>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Try signing in with the correct provider:
              </p>
            </div>
            <OAuthButton provider={provider} size='lg' />
          </div>
        )}

        <div className='text-center'>
          <Link
            href='/signin'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
