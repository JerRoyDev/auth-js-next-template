import { z } from 'zod';
import { AUTH_MESSAGES } from '@/lib/auth/constants/auth.constants';

// * ==========================================================================
// *                               COMMON SCHEMAS
// * ==========================================================================

// **  Email Schema  ** //
export const emailSchema = z
  .email({ message: AUTH_MESSAGES.ERROR_EMAIL_INVALID })
  .min(1, { message: AUTH_MESSAGES.ERROR_EMAIL_REQUIRED });

// **  Password Schema  ** //
export const passwordSchema = z
  .string()
  .min(8, { message: AUTH_MESSAGES.ERROR_PASSWORD_MIN_LENGTH })
  .max(100, { message: AUTH_MESSAGES.ERROR_PASSWORD_MAX_LENGTH })
  .regex(/[A-Z]/, { message: AUTH_MESSAGES.ERROR_PASSWORD_UPPERCASE })
  .regex(/[a-z]/, { message: AUTH_MESSAGES.ERROR_PASSWORD_LOWERCASE })
  .regex(/[0-9]/, { message: AUTH_MESSAGES.ERROR_PASSWORD_NUMBER })
  .regex(/[^A-Za-z0-9]/, { message: AUTH_MESSAGES.ERROR_PASSWORD_SPECIAL })

// **  Username Schema  ** //
export const usernameSchema = z
  .string()
  .min(2, { message: AUTH_MESSAGES.ERROR_NAME_MIN_LENGTH })
  .max(50, { message: AUTH_MESSAGES.ERROR_NAME_MAX_LENGTH });

// * ==========================================================================
// *                              SIGN IN SCHEMA
// * ==========================================================================
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: AUTH_MESSAGES.ERROR_PASSWORD_REQUIRED }),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// * ==========================================================================
// *                               REGISTER SCHEMAS
// * ==========================================================================

// **  Register Form Schema (Client-side)  ** //
export const registerFormSchema = z.object({
  // username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
})
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: AUTH_MESSAGES.ERROR_PASSWORD_MISMATCH,
      path: ['confirmPassword'],
    }
  );

export type RegisterFormData = z.infer<typeof registerFormSchema>;

