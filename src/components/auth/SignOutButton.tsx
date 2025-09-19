'use client';

import { signOutAction } from '@/lib/auth/actions/signOut.action';
import { useFormStatus } from 'react-dom';

function SignOutButtonContent() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {pending ? 'Signing out...' : 'Sign out'}
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
