'use server';

import { prisma } from '@/lib/prisma';

export const verifyEmailToken = async ({ email, token }: { email: string; token: string }) => {
  // Find the verification entry by identifier and token value
  const verification = await prisma.verification.findUnique({
    where: {
      identifier_value: {
        identifier: email,
        value: token,
      },
    },
  });

  if (!verification) {
    return { valid: false, reason: 'Token not found' };
  }
  if (verification.expiresAt < new Date()) {
    return { valid: false, reason: 'Token expired' };
  }

  // Optionally, mark email as verified here if you want
  // await prisma.user.update({
  //   where: { email },
  //   data: { emailVerified: true },
  // });

  return { valid: true, email: verification.identifier };
}