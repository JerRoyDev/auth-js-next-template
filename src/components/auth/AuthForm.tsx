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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const AuthForm = ({
  mode,
  title,
  description,
}: AuthFormProps & { title: string; description?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Get callback URL from search params or use default
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get('callbackUrl') || PROTECTED_ROUTES.USER_LANDING;
  const isSignIn = mode === 'signin';

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>{title || 'Authentication'}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='space-y-6'>
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
        <div className='relative'>
          <Separator />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2'>
            <span className='text-xs text-muted-foreground'>
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
      </CardContent>
      <CardFooter>
        <div className='w-full text-sm text-muted-foreground text-center pt-4 border-t border-border'>
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
      </CardFooter>
    </Card>
  );
};
