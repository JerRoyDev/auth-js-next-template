'use server';

import { signIn } from '@/auth';
import { DEFAULT_AUTHENTICATED_ROUTE } from '../constants/auth.constants';

export async function signInOAuthAction(provider: string) {
  await signIn(provider, {
    redirectTo: DEFAULT_AUTHENTICATED_ROUTE
  });
}
