'use client';

import { authClient } from '@/lib/auth/config/auth-client';
import { useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

const VerifyEmailPage = () => {
  // I VerifyEmailPage.tsx - Lägg till dessa states
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<{
    type: 'error' | 'success' | null;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const router = useRouter();

  // Reset states on component mount and when OTP changes
  useEffect(() => {
    setVerifying(false);
    setStatus(null);
  }, [otp]);

  // Pre-fill email from query parameter
  const emailParam = useSearchParams().get('email');
  useEffect(() => {
    if (emailParam) {
      setEmailInput(emailParam);
    }
  }, [emailParam]);

  const handleClick = async () => {
    await checkOTP('email-verification');
    await verifyOTP();
  };

  // * check if an OTP is valid.
  const checkOTP = async (
    type: 'email-verification' | 'sign-in' | 'forget-password'
  ) => {
    const { data, error } = await authClient.emailOtp.checkVerificationOtp({
      email: emailInput,
      type: type,
      otp: otp,
      fetchOptions: {
        onRequest: () => {
          console.log('Checking OTP...');
          setVerifying(true);
        },
        onResponse: (ctx) => {
          console.log('OTP checked response received.', ctx);
          setVerifying(false);
        },
        onError: (ctx) => {
          console.error('Error checking OTP.', ctx);
          setStatus({
            type: 'error',
            message:
              ctx.error?.message || 'Failed to check OTP. Please try again.',
          });
        },
        onSuccess: (ctx) => {
          console.log('OTP is valid.', ctx);
          setStatus({ type: 'success', message: 'OTP is valid!' });
        },
      },
    });
  };

  // * verify the user's email address with OTP
  const verifyOTP = async () => {
    const { data, error } = await authClient.emailOtp.verifyEmail({
      email: emailInput,
      otp: otp,
      fetchOptions: {
        onRequest: () => {
          console.log('Verifying OTP...');
          setVerifying(true);
        },
        onResponse: (ctx) => {
          console.log('OTP verification response received.', ctx);
          setVerifying(false);
        },
        onError: (ctx) => {
          console.error('Error verifying OTP.', ctx);
          setStatus({
            type: 'error',
            message:
              ctx.error?.message || 'Failed to verify OTP. Please try again.',
          });
        },
        onSuccess: (ctx) => {
          console.log('OTP verified successfully.', ctx);
          setStatus({ type: 'success', message: 'OTP verified successfully!' });
          router.push(
            `${AUTH_ROUTES.LOGIN}?verified=true&email=${encodeURIComponent(emailInput)}`
          );
        },
      },
    });
  };

  // * send an OTP to the user's email address
  const sendOTP = async (
    type: 'email-verification' | 'sign-in' | 'forget-password'
  ) => {
    if (!emailInput) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    setStatus(null);

    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: emailInput, // required
      type: type, // required
      fetchOptions: {
        onRequest: () => {
          console.log('Sending new OTP...');
          setLoading(true);
        },
        onResponse: (ctx) => {
          console.log('New OTP sent.', ctx);
          setLoading(false);
        },
        onError: (ctx) => {
          console.error('Error sending new OTP.', ctx);
          setStatus({
            type: 'error',
            message:
              ctx.error?.message || 'Failed to send new OTP. Please try again.',
          });
          setLoading(false);
        },
        onSuccess: (ctx) => {
          console.log('New OTP sent successfully.', ctx);
          setStatus({
            type: 'success',
            message: 'A new OTP has been sent to your email.',
          });
          setLoading(false);
        },
      },
    });
  };

  return (
    <>
      <div className='mb-4'>
        <label
          htmlFor='otp'
          className='block text-sm font-medium text-muted-foreground mb-2'
        >
          Enter verification code
        </label>
        <input
          id='otp'
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder='123456'
          className='w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-card text-foreground text-center text-lg'
        />
        <p className='text-xs text-muted-foreground mt-2'>
          Enter the 6-digit code sent to your email
        </p>
        {status && (
          <p
            className={`mt-2 text-sm ${
              status.type === 'error'
                ? 'text-destructive'
                : status.type === 'success'
                  ? 'text-green-600'
                  : ''
            }`}
          >
            {status.message}
          </p>
        )}
        <button
          type='button'
          className={`mt-2 text-xs underline text-muted-foreground hover:text-primary transition-colors ${
            status?.type === 'error' ? 'font-semibold text-primary' : ''
          }`}
          onClick={() => sendOTP('email-verification')}
          disabled={loading}
        >
          {status?.type === 'error'
            ? 'Skicka ny kod'
            : 'Har du inte fått någon kod? Skicka ny kod'}
        </button>
      </div>

      <button
        className='mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 mr-2'
        onClick={handleClick}
        disabled={verifying || otp.length !== 6}
      >
        {verifying ? 'Verifying...' : 'Verify Code'}
      </button>
    </>
  );
};

export default VerifyEmailPage;
