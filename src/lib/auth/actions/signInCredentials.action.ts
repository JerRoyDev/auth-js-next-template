'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { PROTECTED_ROUTES } from '../constants/auth.constants';

export async function signInCredentials(email: string, password: string, callbackUrl?: string) {
  try {
    // * Use NextAuth's signIn function with 'credentials' provider
    await signIn('credentials', {
      email,
      password,
      redirect: false // Ingen automatisk omdirigering
    });

    // If sign in was successful, return success response with callback URL support
    return {
      success: true,
      message: 'Sign in successful',
      redirectTo: callbackUrl || PROTECTED_ROUTES.USER_LANDING
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
