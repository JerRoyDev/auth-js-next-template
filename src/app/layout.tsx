// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import FadeIn from '@/components/FadeIn';

import { ThemeProvider } from 'next-themes';
import ClientLayout from './client-layout';

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
      <body className='' suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
