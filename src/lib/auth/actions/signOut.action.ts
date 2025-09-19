'use server';

import { signOut } from '@/lib/auth/config/auth.config';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

export async function signOutAction() {
  await signOut({
    redirectTo: AUTH_ROUTES.LOGIN
  });
}
