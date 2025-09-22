'use client';

import { useAuthError } from '@/lib/auth/hooks/useAuthError';

/**
 * Enkel ErrorMessage komponent som automatiskt visar Auth.js fel
 */
export function AuthErrorMessage() {
  const error = useAuthError();

  if (!error) return null;

  return (
    <div className={error.cssClasses}>
      <p className='font-medium'>{error.title}</p>
      <p className='text-sm mt-1'>{error.message}</p>
    </div>
  );
}
