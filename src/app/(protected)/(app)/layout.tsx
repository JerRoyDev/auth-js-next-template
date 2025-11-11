'use client';
import PageWrapper from '@/components/PageWrapper';
import { usePathname } from 'next/navigation';
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <main className='border border-red-500 flex justify-center w-full min-h-[calc(100vh-4rem)] p-2 md:pt-8 mt-16'>
        <PageWrapper>{children}</PageWrapper>
      </main>
    </>
  );
};

export default AppLayout;
