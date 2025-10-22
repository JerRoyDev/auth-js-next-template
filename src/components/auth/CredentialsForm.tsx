// src/components/auth/CredentialsForm.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from '@/lib/auth/constants/auth.constants';
import { signIn, signUp } from '@/lib/auth/config/auth-client';
import {
  signInSchema,
  registerFormSchema,
} from '@/lib/auth/validations/auth.validations';
import { CredentialsFormProps } from '@/lib/auth/types';

export const CredentialsForm = ({
  mode,
  callbackUrl,
  isLoading,
  setIsLoading,
  setAuthStatusObj,
}: CredentialsFormProps) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // * Router for navigation
  const router = useRouter();

  // * Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFieldErrors({});

    // *  Handle sign in logic
    if (mode === 'signin') {
      // Validate with Zod before sending to Better Auth
      const validation = signInSchema.safeParse({
        email: formValues.email,
        password: formValues.password,
      });

      if (!validation.success) {
        // Extract field errors from Zod
        const fieldErrors = validation.error.flatten().fieldErrors;
        setFieldErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [
              key,
              value?.[0] || '',
            ])
          )
        );
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await signIn.email({
          email: formValues.email,
          password: formValues.password,
          // rememberMe: true,  //If false, the user will be signed out when the browser is closed. (optional) (default: true)
          callbackURL: callbackUrl || PROTECTED_ROUTES.USER_LANDING,
          fetchOptions: {
            onRequest: () => {
              console.log('logging in...');
              setIsLoading(true);
            },
            onResponse: () => {
              console.log('Login response received.');
            },
            onError: (ctx) => {
              console.error('Login error:', ctx.error);
              setAuthStatusObj(ctx.error);
            },
            onSuccess: () => {
              router.push(PROTECTED_ROUTES.USER_LANDING);
            },
          },
        });

        console.log('Login successful:', data);
      } catch (err) {
        console.error('Login error:', err);
      } finally {
        console.log('Login process finished.');
        setIsLoading(false);
      }
    }

    // *  Handle registration logic
    if (mode === 'register') {
      // Validate with Zod before sending to Better Auth
      const validation = registerFormSchema.safeParse({
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      });

      if (!validation.success) {
        // Extract field errors from Zod
        const fieldErrors = validation.error.flatten().fieldErrors;
        setFieldErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [
              key,
              value?.[0] || '',
            ])
          )
        );
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await signUp.email({
          email: formValues.email,
          password: formValues.password,
          name: formValues.email, // or a real name if you have it
          image: undefined, // optional
          callbackURL: PROTECTED_ROUTES.USER_LANDING,
          fetchOptions: {
            onRequest: () => {
              console.log('Registering...');
              setIsLoading(true);
            },
            onResponse: () => {
              console.log('Registration response received.');
            },
            onError: (ctx) => {
              console.error('Register error:', ctx.error);
              setAuthStatusObj(ctx.error);
            },
            onSuccess: () => {
              router.push(`${AUTH_ROUTES.LOGIN}?verificationEmailSent=true`);
            },
          },
        });

        console.log('Registration successful:', data);
      } catch (err) {
        console.error('Registration error:', err);
      } finally {
        console.log('Registration process finished.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='space-y-6'>
      <form onSubmit={handleSubmit} className='space-y-5'>
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 disabled:opacity-50 transition-colors text-foreground placeholder:text-muted-foreground ${
              fieldErrors.email
                ? 'border-destructive focus:ring-destructive focus:border-destructive bg-destructive/10'
                : 'border-border focus:ring-ring focus:border-ring bg-card hover:border-border'
            }`}
          />
          {fieldErrors.email && (
            <p className='mt-1 text-sm text-destructive'>{fieldErrors.email}</p>
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
            value={formValues.password /* 'Hejhej123!' */}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder='Your password'
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 disabled:opacity-50 transition-colors text-foreground placeholder:text-muted-foreground ${
              fieldErrors.password
                ? 'border-destructive focus:ring-destructive focus:border-destructive bg-destructive/10'
                : 'border-border focus:ring-ring focus:border-ring bg-card hover:border-border'
            }`}
          />
          {fieldErrors.password && (
            <p className='mt-1 text-sm text-destructive'>
              {fieldErrors.password}
            </p>
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
              value={formValues.confirmPassword /* 'Hejhej123!' */}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder='Confirm your password'
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 disabled:opacity-50 transition-colors text-foreground placeholder:text-muted-foreground ${
                fieldErrors.confirmPassword
                  ? 'border-destructive focus:ring-destructive focus:border-destructive bg-destructive/10'
                  : 'border-border focus:ring-ring focus:border-ring bg-card hover:border-border'
              }`}
            />
            {fieldErrors.confirmPassword && (
              <p className='mt-1 text-sm text-destructive'>
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base transition-colors shadow-sm hover:shadow-md'
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
};
