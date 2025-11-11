// src/components/PageWrapper.tsx
import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className={cn('border border-green-500 w-full max-w-4xl ', className)}>
      {children}
    </div>
  );
};

export default PageWrapper;
