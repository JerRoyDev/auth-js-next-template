'use client';

import { OAuthButton } from './OAuthButton';

export const RegisterForm = () => {
  return (
    <div className='space-y-4'>
      <div className='rounded border p-4 bg-blue-50 text-sm'>
        <p className='font-medium mb-1'>Skapa konto</p>
        <p className='text-blue-700'>
          Välj en tjänst för att skapa ditt konto. Om du redan har ett konto
          loggas du in automatiskt.
        </p>
      </div>

      <div className='space-y-3'>
        <OAuthButton provider='google' redirectTo='/dashboard' />
        <OAuthButton provider='github' redirectTo='/dashboard' />
        <OAuthButton provider='discord' redirectTo='/dashboard' />
        <OAuthButton provider='facebook' redirectTo='/dashboard' />
      </div>

      <div className='text-xs text-gray-500 text-center'>
        Har du redan ett konto?{' '}
        <a href='/signin' className='text-blue-600 hover:underline'>
          Logga in här
        </a>
      </div>
    </div>
  );
};
