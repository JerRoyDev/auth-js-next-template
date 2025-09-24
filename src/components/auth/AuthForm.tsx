'use client';

import { OAuthButton } from './OAuthButton';
import { AuthErrorMessage } from './AuthErrorMessage';
import { CredentialsForm } from './CredentialsForm';
import { providerMap } from '@/lib/auth/config/auth.config';
import { useSearchParams } from 'next/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

interface AuthFormProps {
  mode: 'signin' | 'register';
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // Filter out credentials from OAuth providers
  const oauthProviders = providerMap.filter(
    (provider) => provider.id !== 'credentials'
  );

  const isSignIn = mode === 'signin';

  return (
    <div className='space-y-6'>
      {/* Visa error meddelande om det finns */}
      <AuthErrorMessage />

      {/* Credentials Form (Sign In / Register) */}
      <CredentialsForm
        mode={mode}
        callbackUrl={isSignIn ? callbackUrl : undefined}
      />

      {/* Divider */}
      {oauthProviders.length > 0 && (
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>
              {isSignIn ? 'Or continue with' : 'Or sign up with'}
            </span>
          </div>
        </div>
      )}

      {/* OAuth Providers */}
      {oauthProviders.length > 0 && (
        <div className='space-y-3'>
          {oauthProviders.map((provider) => (
            <OAuthButton key={provider.id} provider={provider.id} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className='text-xs text-gray-500 text-center'>
        {isSignIn ? (
          <>By signing in you agree to our terms of service.</>
        ) : (
          <>
            Already have an account?{' '}
            <a
              href={AUTH_ROUTES.LOGIN}
              className='text-blue-600 hover:underline'
            >
              Sign in here
            </a>
          </>
        )}
      </div>
    </div>
  );
};
