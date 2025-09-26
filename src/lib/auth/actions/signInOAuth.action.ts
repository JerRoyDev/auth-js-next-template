'use server';

import { signIn } from '@/lib/auth/config/auth.config';
import { DEFAULT_LOGIN_REDIRECT } from '../constants/auth.constants';

export async function signInOAuthAction(provider: string) {
  await signIn(provider, {
    redirectTo: DEFAULT_LOGIN_REDIRECT
  });
}
