import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auth.js Next Template',
  description: 'Flexible authentication template for Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
