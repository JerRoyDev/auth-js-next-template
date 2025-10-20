import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export const metadata: Metadata = {
  title: 'Auth.js Next Template',
  description: 'Flexible authentication template for Next.js',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main>{children}</main>
        <div className='fixed bottom-4 right-4'>
          <ThemeToggleButton />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
