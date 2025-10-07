'use server';

import { signIn } from '@/lib/auth/config/auth.config';
import { AUTH_ROUTES } from '../constants/auth.constants';
import { AuthError } from 'next-auth';

export async function signInCredentials(email: string, password: string) {
  try {
    // * Use NextAuth's signIn function with 'credentials' provider
    await signIn('credentials', {
      email,
      password,
      redirect: false // Ingen automatisk omdirigering
    });

    // If sign in was successful, return success response
    return {
      success: true,
      message: 'Sign in successful',
      redirectTo: AUTH_ROUTES.DEFAULT_AUTHENTICATED_ROUTE
    };
  } catch (error) {

    // Handle known AuthError types
    console.error('💥 Sign in catch error:', error);
    if (error instanceof AuthError) {
      return {
        success: false,
        message: 'Invalid email or password',
        error: error.type
      };
    }
    // Handle unknown errors
    console.error('💥 Sign in catch error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      error: 'unknown'
    };
  }
}
