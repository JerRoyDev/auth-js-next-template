// src/components/auth/CredentialsForm.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const CredentialsForm = ({
  mode,
  callbackUrl,
  isLoading,
  setIsLoading,
}: CredentialsFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  // Determine which schema to use based on mode
  const schema = mode === 'signin' ? signInSchema : registerFormSchema;

  // Initialize React Hook Form with proper typing
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: emailParam || '',
      password: '',
      ...(mode === 'register' && { confirmPassword: '' }),
    },
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    setIsLoading(true);

    // * SIGN IN (email/password)
    if (mode === 'signin') {
      await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: callbackUrl || PROTECTED_ROUTES.USER_LANDING,
        fetchOptions: {
          onRequest: () => {
            console.log('logging in...');
            setIsLoading(true);
          },
          onResponse: () => {
            console.log('Login response received.');
            setIsLoading(false);
          },
          onError: (ctx) => {
            console.error('Login error:', ctx.error);
            setIsLoading(false);

            if (ctx.error?.code === 'EMAIL_NOT_VERIFIED') {
              router.push(
                `${AUTH_ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`
              );
              return;
            }
            router.push(
              `${AUTH_ROUTES.LOGIN}?error=${encodeURIComponent(
                ctx.error?.code || 'login_error'
              )}`
            );
          },
          onSuccess: () => {
            console.log('Login successful');
            router.push(PROTECTED_ROUTES.USER_LANDING);
          },
        },
      });
    }

    // * REGISTER (email/password)
    if (mode === 'register') {
      await signUp.email({
        email: data.email,
        password: data.password,
        name: data.email.split('@')[0],
        fetchOptions: {
          onRequest: () => {
            console.log('Registering...');
            setIsLoading(true);
          },
          onResponse: () => {
            console.log('Registration response received.');
            setIsLoading(false);
          },
          onError: (ctx) => {
            console.error('Register error:', ctx.error);
            setIsLoading(false);
            router.push(
              `${AUTH_ROUTES.REGISTER}?error=${encodeURIComponent(
                ctx.error?.code || 'registration_error'
              )}`
            );
          },
          onSuccess: (ctx) => {
            router.push(
              `${AUTH_ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(
                ctx.data?.user.email as string
              )}`
            );
          },
        },
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
      <FieldGroup>
        {/* Email Field */}
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                {...field}
                id='email'
                type='email'
                autoComplete='email'
                autoFocus
                disabled={isLoading}
                aria-invalid={fieldState.invalid}
                placeholder='john@example.com'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password Field */}
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input
                {...field}
                id='password'
                type='password'
                disabled={isLoading}
                aria-invalid={fieldState.invalid}
                placeholder='Your password'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm Password Field (only for register mode) */}
        {mode === 'register' && (
          <Controller
            name={'confirmPassword' as any}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='confirmPassword'>
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id='confirmPassword'
                  type='password'
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  placeholder='Confirm your password'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {/* Submit Button */}
        <Button type='submit' disabled={isLoading} className='w-full'>
          {isLoading
            ? mode === 'signin'
              ? 'Signing in...'
              : 'Creating account...'
            : mode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
        </Button>
      </FieldGroup>
    </form>
  );
};
