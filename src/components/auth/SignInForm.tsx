'use client';

import { OAuthButton } from './OAuthButton';

export const SignInForm = () => {
  return (
    <div className='space-y-4'>
      <div className='rounded border p-4 bg-neutral-50 text-sm'>
        <p className='font-medium mb-1'>Välj inloggningsmetod</p>
        <p className='text-neutral-600'>
          Logga in med någon av de tillgängliga tjänsterna nedan.
        </p>
      </div>

      <div className='space-y-3'>
        <OAuthButton provider='google' />
        <OAuthButton provider='github' />
        <OAuthButton provider='discord' />
        <OAuthButton provider='facebook' />
      </div>

      <div className='text-xs text-gray-500 text-center'>
        Genom att logga in godkänner du våra användarvillkor.
      </div>
    </div>
  );
};
