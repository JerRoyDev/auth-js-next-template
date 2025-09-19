'use client';

import { OAuthButton } from './OAuthButton';
import { providerMap } from '@/lib/auth/config/auth.config';

export const SignInForm = () => {
  return (
    <div className='space-y-4'>
      <div className='rounded border p-4 bg-neutral-50 text-sm'>
        <p className='font-medium mb-1'>Choose sign-in method</p>
        <p className='text-neutral-600'>
          Sign in with one of the available services below.
        </p>
      </div>

      <div className='space-y-3'>
        {providerMap.map((provider) => (
          <OAuthButton key={provider.id} provider={provider.id} />
        ))}
      </div>

      <div className='text-xs text-gray-500 text-center'>
        By signing in you agree to our terms of service.
      </div>
    </div>
  );
};
