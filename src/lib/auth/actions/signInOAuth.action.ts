'use server';

import { signIn } from '@/auth';
import { PROTECTED_ROUTES } from '../constants/auth.constants';

export async function signInOAuthAction(provider: string, callbackUrl?: string) {
  await signIn(provider, {
    redirectTo: callbackUrl || PROTECTED_ROUTES.USER_LANDING
  });
}
