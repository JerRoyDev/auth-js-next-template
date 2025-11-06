// src/components/PageWrapper.tsx
import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div
      className={cn('flex items-center justify-center px-2 py-4', className)}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
