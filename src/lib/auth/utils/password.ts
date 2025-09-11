import bcrypt from "bcryptjs";

// * HASHING PASSWORD * //
export const saltAndHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// * VERIFYING PASSWORD * //
export const verifyPassword = async (plain: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(plain, hash);
};
