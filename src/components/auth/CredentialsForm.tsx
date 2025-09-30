'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerCredentials } from '@/lib/auth/actions/registerCredentials.action';
import { signInCredentials } from '@/lib/auth/actions/signInCredentials.action';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

interface CredentialsFormProps {
  mode: 'signin' | 'register';
  callbackUrl?: string;
}

export function CredentialsForm({ mode, callbackUrl }: CredentialsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // * Router for navigation
  const router = useRouter();

  // * Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // *  Handle sign in logic
    if (mode === 'signin') {
      try {
        // Sign in with credentials using server action
        const signInResult = await signInCredentials(
          formValues.email,
          formValues.password
        );

        // If sign in was successful, redirect to callbackUrl or default
        if (signInResult.success) {
          router.push(
            callbackUrl ||
              signInResult.redirectTo ||
              AUTH_ROUTES.AUTHENTICATED_HOME
          );
        }

        // If sign in failed, show error message
        if (!signInResult.success) {
          setError(signInResult.message || 'Invalid email or password');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    // *  Handle registration logic
    if (mode === 'register') {
      try {
        // Register new user using server action
        const registerResult = await registerCredentials(formData);

        // If registration was successful
        if (registerResult.success) {
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;

          console.log('🚀 Registration successful');

          // TODO: Verify email ?
        }

        // If registration failed
        if (!registerResult.success) {
          console.log('❌ Registration failed:', registerResult);
          setError(registerResult.message || 'Registration failed');
          setFieldErrors(
            Object.fromEntries(
              Object.entries(registerResult.errors || {}).map(
                ([key, value]) => [key, value?.[0] || '']
              )
            )
          );
        }
      } catch (error) {
        console.error('💥 Registration catch error:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='space-y-6'>
      {/* Show local error for both signin and register modes */}
      {error && (
        <div className='p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2'>
          <svg
            className='w-5 h-5 text-red-500 flex-shrink-0'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form action={handleSubmit} className='space-y-5'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-semibold text-foreground mb-2'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='text' // Use 'text' to use custom validation (see fieldErrors)
            autoComplete='email' // Enable autofill for email
            autoFocus // Autofocus on email field
            required
            disabled={isLoading}
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder='john@example.com'
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 disabled:opacity-50 transition-colors ${
              fieldErrors.email
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
            }`}
          />
          {fieldErrors.email && (
            <p className='mt-1 text-sm text-red-600'>{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-semibold text-foreground mb-2'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            disabled={isLoading}
            value={formValues.password}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder='Your password'
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 disabled:opacity-50 transition-colors ${
              fieldErrors.password
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
            }`}
          />
          {fieldErrors.password && (
            <p className='mt-1 text-sm text-red-600'>{fieldErrors.password}</p>
          )}
        </div>

        {mode === 'register' && (
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-semibold text-foreground mb-2'
            >
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              required
              disabled={isLoading}
              value={formValues.confirmPassword}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder='Confirm your password'
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 disabled:opacity-50 transition-colors ${
                fieldErrors.confirmPassword
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
              }`}
            />
            {fieldErrors.confirmPassword && (
              <p className='mt-1 text-sm text-red-600'>
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base transition-colors shadow-sm hover:shadow-md'
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
