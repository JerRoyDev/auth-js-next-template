'use server';

import { signIn } from '@/lib/auth/config/auth.config';
import { DEFAULT_AUTHENTICATED_ROUTE } from '../constants/auth.constants';

export async function signInOAuthAction(provider: string) {
  await signIn(provider, {
    redirectTo: DEFAULT_AUTHENTICATED_ROUTE
  });
}
