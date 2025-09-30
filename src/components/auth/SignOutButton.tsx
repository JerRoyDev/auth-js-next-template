'use client';

import { signOutAction } from '@/lib/auth/actions/signOut.action';
import { useFormStatus } from 'react-dom';

function SignOutButtonContent() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {pending ? 'Loggar ut...' : 'Logga ut'}
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
