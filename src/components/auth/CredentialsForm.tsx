'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerCredentials } from '@/lib/auth/actions/registerCredentials.action';
import { signInCredentials } from '@/lib/auth/actions/signInCredentials.action';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/auth/constants/auth.constants';

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
            callbackUrl || signInResult.redirectTo || DEFAULT_LOGIN_REDIRECT
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
    <div className='space-y-4'>
      {/* Show local error for both signin and register modes */}
      {error && (
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
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
              fieldErrors.email
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {fieldErrors.email && (
            <p className='mt-1 text-sm text-red-600'>{fieldErrors.email}</p>
          )}
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
            value={formValues.password}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder='Your password'
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
              fieldErrors.password
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
              className='block text-sm font-medium text-gray-700 mb-1'
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
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                fieldErrors.confirmPassword
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
