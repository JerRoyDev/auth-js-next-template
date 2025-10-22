'use client';

import { BetterAuthError } from '@/lib/auth/types';
import {
  getBetterAuthErrorMessage,
  getErrorDisplayClasses,
} from '@/lib/auth/utils/error-handler';
import { useSearchParams } from 'next/navigation';

interface AuthErrorMessageProps {
  error: BetterAuthError | null;
}

export function AuthErrorMessage({ error }: AuthErrorMessageProps) {
  const hasVerificationEmailSent = useSearchParams().get(
    'verificationEmailSent'
  );

  if (!error || !hasVerificationEmailSent) return null;

  // Map error to user-friendly info (title, message, type, severity)
  const errorInfo = getBetterAuthErrorMessage(error);
  const cssClasses = getErrorDisplayClasses(errorInfo);
  const icon = getErrorIcon(errorInfo.type);

  // Icon based on error type
  function getErrorIcon(type: 'error' | 'info' | 'warning') {
    switch (type) {
      case 'error':
        return (
          // Error icon (red cross)
          <svg
            className='w-5 h-5 flex-shrink-0 text-destructive'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'info':
        return (
          // Info icon (blue info)
          <svg
            className='w-5 h-5 flex-shrink-0 text-primary'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-4a1 1 0 100 2 1 1 0 000-2zm2 8a1 1 0 10-2 0v-4a1 1 0 012 0v4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'warning':
        return (
          // Warning icon (yellow exclamation)
          <svg
            className='w-5 h-5 flex-shrink-0 text-yellow-600'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.516 11.591c.75 1.336-.213 2.31-1.742 2.31H3.483c-1.53 0-2.492-.974-1.742-2.31L8.257 3.1zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-1-2a1 1 0 01-1-1V9a1 1 0 012 0v2a1 1 0 01-1 1z'
              clipRule='evenodd'
            />
          </svg>
        );
      default:
        return null;
    }
  }

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
