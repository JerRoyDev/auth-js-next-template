import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

interface VerifyEmailProps {
  username: string;
  verifyUrl: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
  return (
    <Html lang='en' dir='ltr'>
      <Tailwind>
        <Head />
        <Body className='bg-gray-100 font-sans py-[40px]'>
          <Container className='bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto'>
            <Section>
              <Text className='text-[24px] font-bold text-gray-900 mb-[16px]'>
                Verify Your Email Address
              </Text>

              <Text className='text-[16px] text-gray-700 mb-[24px] leading-[24px]'>
                Hi {props.username},
              </Text>

              <Text className='text-[16px] text-gray-700 mb-[24px] leading-[24px]'>
                Thanks for signing up! Please verify your email address by
                clicking the button below to complete your account setup.
              </Text>

              <Section className='text-center mb-[32px]'>
                <Button
                  href={props.verifyUrl}
                  className='bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border'
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className='text-[14px] text-gray-600 mb-[24px] leading-[20px]'>
                This verification link will expire in 24 hours. If you didn't
                create an account, you can safely ignore this email.
              </Text>

              <Hr className='border-gray-200 my-[24px]' />

              <Text className='text-[12px] text-gray-500 leading-[16px] m-0'>
                Best regards,
                <br />
                The Team
              </Text>
            </Section>

            <Hr className='border-gray-200 my-[24px]' />

            <Section>
              <Text className='text-[12px] text-gray-400 leading-[16px] m-0'>
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </Text>
              <Text className='text-[12px] text-gray-400 leading-[16px] m-0'>
                123 Business Street, Stockholm, Sweden
              </Text>
              <Text className='text-[12px] text-gray-400 leading-[16px] m-0'>
                <a href='#' className='text-gray-400 no-underline'>
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
