// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import FadeInWrapper from '@/components/FadeInWrapper';
import Header from '@/components/header/Header';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

export const metadata: Metadata = {
  title: 'Next.js Better Auth Starter',
  description: 'Flexible authentication template for Next.js',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <FadeInWrapper>{children}</FadeInWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
