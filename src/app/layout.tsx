// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <main className='flex-1 '>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
