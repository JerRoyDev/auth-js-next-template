'use client';

import Link from 'next/link';
import { PUBLIC_ROUTES } from '@/lib/auth/constants/auth.constants';

interface HeaderLogoProps {
  scrollInfo?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ scrollInfo }) => {
  return (
    <Link
      href={PUBLIC_ROUTES.HOME}
      className={
        'text-xl font-bold hover:opacity-80 transition-colors ' +
        (scrollInfo && 'opacity-0 transition-opacity duration-75')
      }
    >
      Better Auth
    </Link>
  );
};

export default HeaderLogo;
