// src/components/auth/SignOutButton.tsx

'use client';

import { signOutAction } from '@/lib/auth/actions/auth.action';
import { useState } from 'react';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

function SignOutButtonContent({ className, children }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOutAction();
    } catch (error) {
      console.error('❌ Sign out error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={
        className ||
        'flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      }
    >
      {children || (isLoading ? 'Signing out...' : 'Sign Out')}
    </button>
  );
}

export const SignOutButton = (props: SignOutButtonProps) => {
  return <SignOutButtonContent {...props} />;
};

export default SignOutButton;
