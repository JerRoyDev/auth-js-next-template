'use client';

import { useAuthError } from '@/lib/auth/hooks/useAuthError';

/**
 * Simple ErrorMessage component that automatically shows Auth.js errors
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
