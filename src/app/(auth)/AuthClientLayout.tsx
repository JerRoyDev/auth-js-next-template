'use client';

import React from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

// Base styling
const base =
  'min-h-screen flex items-center justify-center transition-colors duration-300';

// Gradient styles per auth page segment
const gradients: Record<string, string> = {
  signin: 'bg-gradient-to-l from-background to-muted-foreground',
  register: 'bg-gradient-to-r from-background to-muted-foreground',
  error: 'bg-gradient-to-br from-background to-muted-foreground',
};

export default function AuthClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const gradient = (segment && gradients[segment]) || gradients.signin;

  return (
    <div className={`${base} ${gradient} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className='max-w-md w-full space-y-8'>
        <div className='bg-card rounded-xl shadow-lg p-8 border border-border'>
          {children}
        </div>
      </div>
    </div>
  );
}
