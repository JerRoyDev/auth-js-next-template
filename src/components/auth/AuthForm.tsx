'use client';

import { OAuthButton } from './OAuthButton';
import { CredentialsForm } from './CredentialsForm';
import { useSearchParams } from 'next/navigation';
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from '@/lib/auth/constants/auth.constants';
import { useState } from 'react';
import { AuthFormProps, BetterAuthError } from '@/lib/auth/types';
import { AuthStatusMessage } from './AuthStatusMessage';

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Get callback URL from search params or use default
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get('callbackUrl') || PROTECTED_ROUTES.USER_LANDING;

  const isSignIn = mode === 'signin';

  return (
    <div className='space-y-6'>
      {/* Visa error meddelande om det finns */}
      <AuthStatusMessage />

      {/* Credentials Form (Sign In / Register) */}
      <CredentialsForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        mode={mode}
        callbackUrl={isSignIn ? callbackUrl : undefined}
      />

      {/* Divider */}
      <div className='relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-border' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-4 bg-card text-muted-foreground font-medium'>
            {isSignIn ? 'Or continue with' : 'Or sign up with'}
          </span>
        </div>
      </div>

      {/* OAuth Providers: Manually added to prevent hydration errors */}
      <div className='flex flex-wrap justify-center items-center gap-3'>
        <OAuthButton provider='google' callbackUrl={callbackUrl} />
        <OAuthButton provider='github' callbackUrl={callbackUrl} />
        <OAuthButton provider='discord' callbackUrl={callbackUrl} />
        <OAuthButton provider='facebook' callbackUrl={callbackUrl} />
      </div>

      {/* Footer */}
      <div className='text-sm text-muted-foreground text-center pt-4 border-t border-border'>
        {isSignIn ? (
          <>
            Don&apos;t have an account?{' '}
            <a
              href={AUTH_ROUTES.REGISTER}
              className='text-primary hover:opacity-90 font-medium hover:underline transition-colors'
            >
              Create one here
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a
              href={AUTH_ROUTES.LOGIN}
              className='text-primary hover:opacity-90 font-medium hover:underline transition-colors'
            >
              Sign in here
            </a>
          </>
        )}
      </div>
    </div>
  );
};
