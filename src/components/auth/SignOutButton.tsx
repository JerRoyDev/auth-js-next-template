'use client';

import { signOutAction } from '@/lib/auth/actions/signOut.action';
import { useFormStatus } from 'react-dom';

function SignOutButtonContent() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {pending ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <SignOutButtonContent />
    </form>
  );
}
