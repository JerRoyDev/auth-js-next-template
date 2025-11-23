// src/components/layouts/ContentLayout.tsx
import { cn } from '@/lib/utils';
import React from 'react';

type MaxWidthVariant =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'
  | 'screen-2xl';

interface ContentLayoutProps {
  children: React.ReactNode;
  maxWidth?: MaxWidthVariant;
  className?: string;
  centered?: boolean;
  noPadding?: boolean;
  noTopMargin?: boolean;
}

const maxWidthClasses: Record<MaxWidthVariant, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
  'screen-2xl': 'max-w-screen-2xl',
};

const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  maxWidth = '7xl',
  className,
  centered = false,
  noPadding = false,
  noTopMargin = false,
}) => {
  return (
    <main
      className={cn(
        'min-h-[calc(100vh-4rem)] w-full',
        !noTopMargin && 'mt-16',
        !noPadding && 'px-4 sm:px-6 lg:px-8 py-6 lg:py-8',
        centered && 'flex items-center justify-center',
        className
      )}
    >
      <div
        className={cn(
          'w-full mx-auto',
          maxWidthClasses[maxWidth],
          centered && 'flex flex-col items-center justify-center'
        )}
      >
        {children}
      </div>
    </main>
  );
};

export default ContentLayout;
