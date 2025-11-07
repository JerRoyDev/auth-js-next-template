'use client';

import { authClient } from '@/lib/auth/config/auth-client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<{
    type: 'error' | 'success' | null;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  // Reset states on component mount and when OTP changes
  useEffect(() => {
    setVerifying(false);
    setStatus(null);
  }, [otp]);

  // Pre-fill email from query parameter
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmailInput(emailParam);
    }
  }, [searchParams]);

  const handleClick = async () => {
    await verifyOTP();
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
            `${AUTH_ROUTES.LOGIN}?verified=true&email=${encodeURIComponent(
              emailInput
            )}`
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
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center p-2'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader className='text-center'>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to{' '}
            <span className='font-semibold text-foreground'>{emailInput}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
            className='space-y-4'
          >
            <div className='flex flex-col items-center'>
              <Label htmlFor='otp' className='sr-only'>
                Verification code
              </Label>
              <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {status && (
              <Alert
                variant={status.type === 'error' ? 'destructive' : 'default'}
                className='mt-2'
              >
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}
            <Button
              type='submit'
              className='w-full'
              disabled={verifying || otp.length !== 6}
            >
              {verifying ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>
          <Button
            type='button'
            variant='link'
            className='w-full mt-4 text-xs text-muted-foreground'
            onClick={() => sendOTP('email-verification')}
            disabled={loading}
          >
            {loading ? 'Sending...' : "Didn't receive a code? Send again"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
