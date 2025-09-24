'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { registerWithCredentials } from '@/lib/auth/actions/registerWithCredentials.action';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/auth/constants/auth.constants';

interface CredentialsFormProps {
  mode: 'signin' | 'register';
  callbackUrl?: string;
}

export function CredentialsForm({ mode, callbackUrl }: CredentialsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    if (mode === 'signin') {
      try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Sign in with credentials
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else if (result?.ok) {
          router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Register with credentials (server action)
      // Server action handles all errors and redirects, so no try/catch needed
      await registerWithCredentials(formData);
      // Note: setIsLoading(false) will never be reached because server action redirects
    }
  };

  return (
    <div className='space-y-4'>
      {/* Show local error only for signin mode. Register errors are handled by AuthErrorMessage via URL params */}
      {error && mode === 'signin' && (
        <div className='p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm'>
          {error}
        </div>
      )}

      <form action={handleSubmit} className='space-y-3'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            disabled={isLoading}
            placeholder='john@example.com'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50'
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            disabled={isLoading}
            placeholder='Your password'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50'
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
        >
          {isLoading
            ? mode === 'signin'
              ? 'Signing in...'
              : 'Creating account...'
            : mode === 'signin'
            ? 'Sign In'
            : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
