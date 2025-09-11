import { z } from "zod";
import { AUTH_MESSAGES } from "@/lib/auth/constants/auth.constants";

// Grundscheman
export const emailSchema = z.string()
  .min(1, "Email is required")
  .email("Invalid email");

export const passwordSchema = z.string()
  .min(8, AUTH_MESSAGES.ERROR_PASSWORD_MIN_LENGTH)
  .max(32, AUTH_MESSAGES.ERROR_PASSWORD_MAX_LENGTH)
  .regex(/[A-Z]/, AUTH_MESSAGES.ERROR_PASSWORD_UPPERCASE)
  .regex(/[a-z]/, AUTH_MESSAGES.ERROR_PASSWORD_LOWERCASE)
  .regex(/[0-9]/, AUTH_MESSAGES.ERROR_PASSWORD_NUMBER)
  .regex(/[^A-Za-z0-9]/, AUTH_MESSAGES.ERROR_PASSWORD_SPECIAL);

export const usernameSchema = z.string()
  .min(2, AUTH_MESSAGES.ERROR_NAME_MIN_LENGTH)
  .max(50, AUTH_MESSAGES.ERROR_NAME_MAX_LENGTH)
  .optional();

// Register-schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  // username: usernameSchema,
});

// SignIn-schema
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
