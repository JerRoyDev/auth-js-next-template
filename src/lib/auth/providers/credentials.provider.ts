import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "../validations/auth.validations";
import { verifyPassword } from "../utils/password";

/**
 * * Credentials Provider Configuration
 * 
 * ⚠️  IMPORTANT: If using this provider, consider switching to JWT sessions
 * ⚠️  Database sessions + Credentials requires custom implementation
 * 💡 For production: Consider OAuth providers for better security
 */
export const credentialsProvider = Credentials({
  name: "credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email",
      placeholder: "john@example.com"
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Your password"
    },
  },
  async authorize(credentials) {
    try {
      // Validate input using Zod schema
      const { email, password } = await signInSchema.parseAsync(credentials);

      // Find user in database
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          password: true,
          image: true,
        },
      });

      // Check if user exists and has a password
      if (!user || !user.password) {
        return null;
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        return null;
      }

      // Return user object (without password)
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      };
    } catch (error) {
      // Log error for debugging but don't expose details
      console.error("Credentials authorization error:", error);
      return null;
    }
  },
});