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
      <p className='font-semibold text-base'>{error.title}</p>
      <p className='text-sm mt-2 leading-relaxed'>{error.message}</p>
    </div>
  );
}
