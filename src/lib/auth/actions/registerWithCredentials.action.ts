'use server';

import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth/config/auth.config';
import { prisma } from '@/lib/prisma';
import { registerFormSchema } from '../validations/auth.validations';
import { saltAndHashPassword } from '../utils/password';
import { AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT } from '../constants/auth.constants';

/**
 * Server action for registering a new user with credentials
 */
export async function registerWithCredentials(formData: FormData) {
  try {
    // Extract data from FormData
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate input with Zod
    const validatedData = await registerFormSchema.parseAsync({
      email,
      password,
    });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      // Redirect to sign-in with error message
      return redirect(`${AUTH_ROUTES.LOGIN}?error=EmailExists&email=${encodeURIComponent(validatedData.email)}`);
    }

    // Hash the password
    const hashedPassword = await saltAndHashPassword(validatedData.password);

    // Create new user
    await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Automatic login after registration
    try {
      await signIn('credentials', {
        email: validatedData.email,
        password: validatedData.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch {
      // If auto-login fails, redirect to sign-in with success message
      return redirect(`${AUTH_ROUTES.LOGIN}?success=AccountCreated&email=${encodeURIComponent(validatedData.email)}`);
    }

  } catch (error) {
    console.error('Registration error:', error);

    // Extract email for error messages
    const email = formData.get('email') as string;

    // Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      const firstError = (error as { issues: Array<{ message: string }> }).issues[0];
      return redirect(`${AUTH_ROUTES.REGISTER}?error=ValidationError&message=${encodeURIComponent(firstError.message)}`);
    }

    // Database errors
    if (error && typeof error === 'object' && 'code' in error) {
      if ((error as { code: string }).code === 'P2002') { // Unique constraint violation
        return redirect(`${AUTH_ROUTES.LOGIN}?error=EmailExists&email=${encodeURIComponent(email || '')}`);
      }
    }

    // Generic error
    return redirect(`${AUTH_ROUTES.REGISTER}?error=RegistrationFailed`);
  }
}