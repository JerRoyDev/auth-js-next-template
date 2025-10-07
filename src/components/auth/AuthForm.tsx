'use client';

import { OAuthButton } from './OAuthButton';
import { AuthErrorMessage } from './AuthErrorMessage';
import { CredentialsForm } from './CredentialsForm';
import { providerMap } from '@/lib/auth/config/auth.config';
import { useSearchParams } from 'next/navigation';
import { PUBLIC_ROUTES } from '@/lib/auth/constants/auth.constants';

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
      )}

      {/* OAuth Providers */}
      {oauthProviders.length > 0 && (
        <div className='flex flex-wrap justify-center items-center gap-3'>
          {oauthProviders.map((provider) => (
            <OAuthButton key={provider.id} provider={provider.id} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className='text-sm text-muted-foreground text-center pt-4 border-t border-border'>
        {isSignIn ? (
          <>
            Don't have an account?{' '}
            <a
              href={PUBLIC_ROUTES.REGISTER}
              className='text-primary hover:opacity-90 font-medium hover:underline transition-colors'
            >
              Create one here
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a
              href={PUBLIC_ROUTES.LOGIN}
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
