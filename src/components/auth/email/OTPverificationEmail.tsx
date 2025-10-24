import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Tailwind,
} from '@react-email/components';

interface OTPVerificationEmailProps {
  otpCode: string;
  expirationTime: string;
  user: {
    email?: string;
  };
}

const OTPVerificationEmail = (props: OTPVerificationEmailProps) => {
  const { otpCode, expirationTime, user } = props;

  return (
    <Html lang='en' dir='ltr'>
      <Tailwind>
        <Head />
        <Body className='bg-gray-100 font-sans py-[40px]'>
          <Container className='bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]'>
            {/* Header */}
            <Section className='text-center mb-[32px]'>
              <Heading className='text-[24px] font-bold text-gray-900 m-0 mb-[16px]'>
                Verify Your Account
              </Heading>
              {user.email && (
                <Text className='text-[18px] text-gray-700 m-0 mb-[8px]'>
                  Hello, {user.email}
                </Text>
              )}
              <Text className='text-[16px] text-gray-600 m-0'>
                Please use the verification code below to complete your account
                setup.
              </Text>
            </Section>

            {/* OTP Code Section */}
            <Section className='text-center mb-[32px]'>
              <div className='bg-gray-50 border-[2px] border-solid border-gray-200 rounded-[8px] p-[24px] mb-[16px]'>
                <Text className='text-[12px] text-gray-500 uppercase tracking-wide m-0 mb-[8px]'>
                  Your Verification Code
                </Text>
                <Text className='text-[36px] font-bold text-gray-900 letter-spacing-[8px] m-0'>
                  {otpCode}
                </Text>
              </div>
              <Text className='text-[14px] text-red-600 m-0'>
                ⏰ This code expires in {expirationTime}
              </Text>
            </Section>

            <Hr className='border-gray-200 my-[24px]' />

            {/* Instructions */}
            <Section className='mb-[32px]'>
              <Text className='text-[16px] text-gray-700 m-0 mb-[16px]'>
                <strong>How to use this code:</strong>
              </Text>
              <Text className='text-[14px] text-gray-600 m-0 mb-[8px]'>
                1. Return to the verification page
              </Text>
              <Text className='text-[14px] text-gray-600 m-0 mb-[8px]'>
                2. Enter the 6-digit code above
              </Text>
              <Text className='text-[14px] text-gray-600 m-0 mb-[16px]'>
                3. Complete your account verification
              </Text>

              <Text className='text-[14px] text-gray-500 m-0'>
                If you didn't request this verification code, please ignore this
                email or contact our support team if you have concerns.
              </Text>
            </Section>

            {/* Account Info */}
            {user.email && (
              <Section className='mb-[24px]'>
                <Text className='text-[12px] text-gray-400 m-0'>
                  This verification code was sent to: {user.email}
                </Text>
              </Section>
            )}

            {/* Footer */}
            <Hr className='border-gray-200 my-[24px]' />
            <Section className='text-center'>
              <Text className='text-[12px] text-gray-400 m-0 mb-[8px]'>
                This is an automated message, please do not reply to this email.
              </Text>
              <Text className='text-[12px] text-gray-400 m-0'>
                © 2024 Your Company Name. All rights reserved.
              </Text>
              <Text className='text-[12px] text-gray-400 m-0'>
                123 Business Street, Stockholm, Sweden
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OTPVerificationEmail;
