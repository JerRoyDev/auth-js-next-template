// src/components/PageWrapper.tsx
import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return <div className={cn('w-full', className)}>{children}</div>;
};

export default PageWrapper;
