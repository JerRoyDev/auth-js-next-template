'use server';

import { signOut } from '@/auth';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

export async function signOutAction() {
  await signOut({
    redirectTo: AUTH_ROUTES.LOGIN
  });
}
