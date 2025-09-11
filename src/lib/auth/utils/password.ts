import bcrypt from "bcryptjs";

// * HASHING PASSWORD * //
export function saltAndHashPassword(password: string): string {
  // Salt och hashar ett plaintext-lösenord
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// * VERIFYING PASSWORD * //
export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}