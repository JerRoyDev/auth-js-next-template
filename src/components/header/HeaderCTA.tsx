'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';

interface HeaderCTAProps {
  data: any;
}

const HeaderCTA: React.FC<HeaderCTAProps> = ({ data }) => {
  if (data) return null;

  return (
    <>
      {/* Mobile version - visible in Sheet */}
      <div className='lg:hidden flex flex-col gap-4 w-full'>
        <Button asChild variant='outline' size='lg' className='w-full'>
          <Link href={AUTH_ROUTES.LOGIN}>Sign In</Link>
        </Button>
        <Button asChild variant='default' size='lg' className='w-full'>
          <Link href={AUTH_ROUTES.REGISTER}>Create Account</Link>
        </Button>
      </div>

      {/* Desktop version */}
      <div className='hidden lg:flex items-center space-x-2'>
        <Button asChild variant='outline' size='sm'>
          <Link href={AUTH_ROUTES.LOGIN}>Sign In</Link>
        </Button>
        <Button asChild variant='default' size='sm'>
          <Link href={AUTH_ROUTES.REGISTER}>Create Account</Link>
        </Button>
      </div>
    </>
  );
};

export default HeaderCTA;
