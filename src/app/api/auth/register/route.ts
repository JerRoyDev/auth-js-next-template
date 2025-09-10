import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { saltAndHashPassword } from "@/utils/password";
import { registerSchema } from "@/lib/auth/validations/auth.validations";
import { AUTH_MESSAGES } from "@/lib/auth/constants/auth.constants";

export async function POST(request: Request) {
  const body = await request.json();
  // Validera med Zod
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const {/* username, */  email, password } = result.data;

  // Kontrollera om användaren redan finns
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: AUTH_MESSAGES.ERROR_EMAIL_EXISTS }, { status: 409 });
  }

  // Hasha lösenordet
  const hashedPassword = saltAndHashPassword(password);

  // Skapa användaren
  const user = await prisma.user.create({
    data: {
      // username,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email, /* username: user.username */ } }, { status: 201 });
}
