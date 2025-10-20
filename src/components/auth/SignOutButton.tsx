// src/components/auth/SignOutButton.tsx

'use client';

import { signOut } from '@/lib/auth/config/auth-client';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignOutButtonContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          console.log('🔄 Signing out...');
          setIsLoading(true);
        },
        onSuccess: () => {
          console.log('✅ Sign out successful');
          router.push(AUTH_ROUTES.LOGIN);
        },
        onError: (ctx) => {
          console.error('❌ Sign out error:', ctx.error);
          // Optionally show error toast
        },
        onFinally: () => {
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className='flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}

export const SignOutButton = () => {
  return <SignOutButtonContent />;
};

export default SignOutButton;
