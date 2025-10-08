'use server';

import { signIn } from '@/auth';
import { DEFAULT_AUTHENTICATED_ROUTE } from '../constants/auth.constants';
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
      redirectTo: DEFAULT_AUTHENTICATED_ROUTE
    };
  } catch (error) {

    // Handle known AuthError types
    if (error instanceof AuthError) {
      console.error('💥 Sign in catch error:', error);
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
