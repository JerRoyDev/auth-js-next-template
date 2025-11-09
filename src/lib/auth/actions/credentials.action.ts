// src/lib/auth/actions/credentials.action.ts
'use server'

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "../constants/auth.constants";
import { headers } from "next/headers";

const signUpAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name
    }
  });

  redirect(`${AUTH_ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`,);

}

const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  redirect(`${PROTECTED_ROUTES.USER_LANDING}`);
}

const signOutAction = async () => {
  await auth.api.signOut({
    headers: await headers()
  });
  redirect(AUTH_ROUTES.LOGIN);
}

export {
  signUpAction,
  signInAction
}
