'use client';

import { OAuthButton } from './OAuthButton';
import { providerMap } from '@/lib/auth/config/auth.config';

export const RegisterForm = () => {
  return (
    <div className='space-y-4'>
      <div className='rounded border p-4 bg-blue-50 text-sm'>
        <p className='font-medium mb-1'>Create account</p>
        <p className='text-blue-700'>
          Choose a service to create your account. If you already have an
          account you will be signed in automatically.
        </p>
      </div>

      <div className='space-y-3'>
        {providerMap.map((provider) => (
          <OAuthButton key={provider.id} provider={provider.id} />
        ))}
      </div>

      <div className='text-xs text-gray-500 text-center'>
        Already have an account?{' '}
        <a href='/signin' className='text-blue-600 hover:underline'>
          Sign in here
        </a>
      </div>
    </div>
  );
};
