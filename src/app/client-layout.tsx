'use client';
import Header from '@/components/Header';
import FadeIn from '@/components/FadeIn';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <Header />
      <main className='flex-1 pt-16'>
        <FadeIn key={pathname}>{children}</FadeIn>
      </main>
    </ThemeProvider>
  );
}
