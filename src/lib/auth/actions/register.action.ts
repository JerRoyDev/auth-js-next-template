"use server";

import { prisma } from "@/prisma";
import { saltAndHashPassword } from "@/lib/auth/utils/password";
import { registerSchema } from "@/lib/auth/validations/auth.validations";

export async function registerAction(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Validera med Zod
  const result = registerSchema.safeParse({ email, password });
  if (!result.success) {
    // Du kan hantera fel här, t.ex. returnera ett felmeddelande
    return;
  }

  // Kontrollera om användaren redan finns
  const existingUser = await prisma.user.findUnique({ where: { email: String(email) } });
  if (existingUser) {
    // Hantera "email already exists"-fel
    return;
  }

  // Hasha lösenordet
  const hashedPassword = await saltAndHashPassword(String(password));

  // Skapa användaren
  await prisma.user.create({
    data: {
      email: String(email),
      password: hashedPassword,
    },
  });
}
