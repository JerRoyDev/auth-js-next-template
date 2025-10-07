'use server';

import { signIn } from '@/lib/auth/config/auth.config';
import { AUTH_ROUTES } from '../constants/auth.constants';

export async function signInOAuthAction(provider: string) {
  await signIn(provider, {
    redirectTo: AUTH_ROUTES.DEFAULT_AUTHENTICATED_ROUTE
  });
}
