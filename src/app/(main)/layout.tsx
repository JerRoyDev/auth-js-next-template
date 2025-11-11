'use client';
import PageWrapper from '@/components/PageWrapper';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='border border-red-500 flex justify-center w-full min-h-[calc(100vh-4rem)] p-2 md:pt-8 mt-16'>
        <PageWrapper>{children}</PageWrapper>
      </main>
    </>
  );
};

export default MainLayout;
