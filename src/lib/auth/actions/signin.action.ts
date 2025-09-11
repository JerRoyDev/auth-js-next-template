"use server";

import { signIn } from "next-auth/react";

export async function signInAction(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Kör Auth.js credentials-inloggning
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  // Hantera redirect eller error här om du vill, men returnera inget!
}