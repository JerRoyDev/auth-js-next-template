// src/auth.ts

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './lib/prisma';
import { admin, emailOTP } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import sendEmail from './lib/email/resend-provider';
import OTPVerificationEmail from './components/auth/email/OTPverificationEmail';

export const auth = betterAuth({

  baseUrl: process.env.BETTER_AUTH_BASE_URL, // Viktigt för korrekta callback URLs

  jwtSecret: process.env.AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: 'sqlite', // Eller 'postgresql', 'mysql', etc., beroende på vad du använder.
  }),


  // Email & Password authentication (replaces credentials provider)
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

  },

  // Oauth providers
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },

  },
  // Session configuration (using constants from auth.constants.ts)
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    updateAge: 60 * 60, // 1 hour in seconds
  },

  // Rate limiting configuration
  rateLimit: {
    enabled: true,
    window: 60, // Time window in seconds (1 minute)
    max: 3, // Max requests per window
    // Storage will use memory by default (or database if you configure it)
  },

  // Advanced options
  advanced: {
    cookiePrefix: "better-auth",
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  // Plugins
  plugins: [
    //* Admin plugin for role management
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],

    }),
    //* Email OTP plugin for sending verification and password reset emails
    emailOTP({
      overrideDefaultEmailVerification: true, // 👈 Viktig inställning
      expiresIn: 10 * 60, // 10 minuter
      otpLength: 6,
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // Skicka OTP-koden för e-postverifiering
          await sendEmail({
            from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
            to: email,
            subject: "Your verification code",
            react: OTPVerificationEmail({
              otpCode: otp,
              expirationTime: "10 minutes",
              user: {
                email: email,
              },
            }),
          });
        } else if (type === "sign-in") {
          // Hantera inloggning med OTP
        } else if (type === "forget-password") {
          // Hantera återställning av lösenord
        }
      },
    }),
    // LÄGG TILL nextCookies plugin sist för att säkerställa korrekt cookie-hantering
    nextCookies(),
  ],

});


