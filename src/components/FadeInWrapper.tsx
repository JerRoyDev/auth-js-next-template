'use client';

import FadeIn from '@/components/FadeIn';
import { usePathname } from 'next/navigation';

const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return <FadeIn key={pathname}>{children}</FadeIn>;
};

export default FadeInWrapper;
