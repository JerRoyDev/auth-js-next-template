'use client';

import { BetterAuthError } from '@/lib/auth/types';
import {
  getBetterAuthErrorMessage,
  getErrorDisplayClasses,
} from '@/lib/auth/utils/error-handler';

interface AuthErrorMessageProps {
  error: BetterAuthError | null;
}

export function AuthErrorMessage({ error }: AuthErrorMessageProps) {
  if (!error) return null;

  // Map error to user-friendly info (title, message, type, severity)
  const errorInfo = getBetterAuthErrorMessage(error);
  const cssClasses = getErrorDisplayClasses(errorInfo);

  // Icon based on error type
  const icon = (
    <svg
      className='w-5 h-5 flex-shrink-0'
      fill='currentColor'
      viewBox='0 0 20 20'
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
        clipRule='evenodd'
      />
    </svg>
  );

  return (
    <div className={cssClasses} role='alert'>
      {icon}
      <div>
        <span className='font-semibold'>{errorInfo.title}:</span>
        <span className='ml-1'>{errorInfo.message}</span>
      </div>
    </div>
  );
}
