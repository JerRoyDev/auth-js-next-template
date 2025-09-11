import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/auth/validations/auth.validations";
import { saltAndHashPassword, verifyPassword } from "@/lib/auth/utils/password";



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Validera credentials med Zod
        const { email, password } = await signInSchema.parseAsync(credentials);

        // Hämta Prisma-klienten
        const { prisma } = await import("@/prisma");
        // Hämta användaren från databasen
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) return null;

        // Verifiera lösenordet mot hash i databasen
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return null;

        // Returnera användarobjekt (utan lösenord)
        return {
          id: user.id,
          email: user.email,
          // username: user.username, // om du har username
        };
      },
    }),
  ],
})