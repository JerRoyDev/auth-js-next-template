import Link from 'next/link';
import { OAuthButton } from '@/components/auth/OAuthButton';

interface AuthErrorPageProps {
  searchParams: {
    error?: string;
    email?: string;
    provider?: string;
  };
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error, email, provider } = searchParams;

  if (error === 'OAuthAccountNotLinked') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='text-center'>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Account Already Exists
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              {email
                ? `The email ${email} is already registered`
                : 'Your email is already registered'}
              {provider && ` with ${provider}`}.
            </p>
          </div>

          <div className='mt-8 space-y-4'>
            <div className='rounded-md bg-blue-50 p-4'>
              <div className='text-sm text-blue-700'>
                <p className='font-medium mb-2'>Sign in instead:</p>
                {provider && (
                  <p>
                    You previously registered with <strong>{provider}</strong>.
                    Use the button below:
                  </p>
                )}
              </div>
            </div>

            {/* Visa rätt provider-knapp */}
            {provider === 'discord' && (
              <OAuthButton provider='discord' size='lg' />
            )}
            {provider === 'google' && (
              <OAuthButton provider='google' size='lg' />
            )}
            {provider === 'github' && (
              <OAuthButton provider='github' size='lg' />
            )}
            {provider === 'facebook' && (
              <OAuthButton provider='facebook' size='lg' />
            )}

            {/* Fallback if we don't know the provider */}
            {!provider && (
              <>
                <p className='text-sm text-gray-600 text-center'>
                  Try signing in with one of these:
                </p>
                <div className='space-y-2'>
                  <OAuthButton provider='google' size='md' />
                  <OAuthButton provider='discord' size='md' />
                  <OAuthButton provider='github' size='md' />
                  <OAuthButton provider='facebook' size='md' />
                </div>
              </>
            )}

            <div className='text-center mt-6'>
              <Link
                href='/signin'
                className='text-indigo-600 hover:text-indigo-500 text-sm'
              >
                ← Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for other errors
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Something went wrong
        </h2>
        <p className='text-gray-600 mb-4'>
          {error || 'An unknown error occurred'}
        </p>
        <Link href='/signin' className='text-indigo-600 hover:text-indigo-500'>
          Try again
        </Link>
      </div>
    </div>
  );
}
