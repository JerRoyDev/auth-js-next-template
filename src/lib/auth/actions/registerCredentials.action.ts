'use server';

import { prisma } from '@/lib/prisma';
import { registerFormSchema } from '../validations/auth.validations';
import { saltAndHashPassword } from '../utils/password';
import { AUTH_MESSAGES } from '../constants/auth.constants';

/**
 * Server action for registering a new user with credentials
 */
export async function registerCredentials(formData: FormData) {
  try {
    // * Extract form data
    const rawFormData = {
      /* name: formData.get('name'), */
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    // * Validate input using Zod schema specific for API/Action
    const validationResult = await registerFormSchema.safeParseAsync(rawFormData);
    console.log('💥 Registration validation result:', validationResult);
    console.log('💥 Field errors:', validationResult.error?.flatten().fieldErrors);

    // * If validation fails, RETURN errors and input values (excluding passwords)
    if (!validationResult.success) {
      return {
        message: AUTH_MESSAGES.ERROR_INVALID_INPUT,
        errors: validationResult.error.flatten().fieldErrors,
        inputValues: {
          /* name: rawFormData.name as string || '', */
          email: rawFormData.email as string || '',
          // Password fields are not returned for security reasons
        },
        success: false,
      };
    }

    // * Destructure validated data
    const { /* name, */ email, password } = validationResult.data;

    // * Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    // * If user exists, RETURN error about existing account
    if (existingUser) {
      if (existingUser.accounts && existingUser.accounts.length > 0) {
        return {
          message: AUTH_MESSAGES.ERROR_EMAIL_EXISTS_OAUTH,
          errors: { _form: [AUTH_MESSAGES.ERROR_EMAIL_EXISTS_OAUTH] },
          success: false,
        };
      } else {
        return {
          message: AUTH_MESSAGES.ERROR_EMAIL_EXISTS,
          errors: { _form: [AUTH_MESSAGES.ERROR_EMAIL_EXISTS] },
          success: false,
        };
      }
    }

    // * Hash the password
    const hashedPassword = await saltAndHashPassword(password);

    // * Create the user
    const newUser = await prisma.user.create({
      data: {
        /* name, */
        email,
        password: hashedPassword,
        /* role: USER_ROLES.USER, */ // Default role is USER, so this line is optional
        /* emailVerified: null, */ // Email verification can be handled later
      },
    });

    // * Create Account record for credentials authentication
    // This enables account linking and provider tracking
    await prisma.account.create({
      data: {
        userId: newUser.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: newUser.id,
      },
    });

    // * Delete any existing verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // TODO: // * Generate verification token and send email

    // * Prepare user object without password for return
    const { password: _password, ...userWithoutPassword } = newUser;

    // * Return success response
    return {
      message: AUTH_MESSAGES.SUCCESS_REGISTRATION_VERIFICATION_SENT,
      success: true,
      user: userWithoutPassword,
    };

  } catch (error) {
    console.error('Registration action error:', error);
    return {
      message: AUTH_MESSAGES.ERROR_REGISTRATION_FAILED,
      errors: { _form: [AUTH_MESSAGES.ERROR_REGISTRATION_FAILED] },
      success: false,
    };
  }
}