'use server';

import { signOut } from '@/lib/auth/config/auth.config';
import { PUBLIC_ROUTES } from '@/lib/auth/constants/auth.constants';

export async function signOutAction() {
  await signOut({
    redirectTo: PUBLIC_ROUTES.LOGIN
  });
}
