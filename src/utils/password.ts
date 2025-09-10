import bcrypt from "bcryptjs";

export function saltAndHashPassword(password: string): string {
  // Salt och hashar ett plaintext-lösenord
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// Exempel på Prisma-baserad användarhämtning
import { prisma } from "@/prisma";

export async function getUserFromDb(email: string, pwHash: string) {
  // Hämta användaren från databasen
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return null;
  // Jämför hashat lösenord (byt ut mot riktig hash-verifiering i produktion)
  // Om du sparar hash i user.password
  if (user.password && bcrypt.compareSync(pwHash, user.password)) {
    return user;
  }
  return null;
}
