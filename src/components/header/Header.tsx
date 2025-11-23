// Header.tsx
'use client';

import { useSession } from '@/lib/auth/config/auth-client';
import { usePathname } from 'next/navigation';
import useScrollPosition from '@/hooks/useScrollInfo';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ModeToggle from '@/components/mode-toggle';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderCTA from './HeaderCTA';
import HeaderUser from './HeaderUser';

interface HeaderProps {
  excludedPaths?: string[];
}

const Header: React.FC<HeaderProps> = ({ excludedPaths = [] }) => {
  const pathname = usePathname();
  const isExcluded = useMemo(
    () => excludedPaths.includes(pathname || ''),
    [pathname, excludedPaths]
  );

  const { data, error, isPending } = useSession();

  if (isExcluded) {
    return <div className='sr-only'>Header hidden on this page</div>;
  }

  // 3. Header start
  return (
    <header
      className={
        'w-full border-b border-accent bg-background shadow-2xl fixed top-0 left-0 right-0 z-30 h-16'
      }
    >
      {/* Header Content (all views) */}
      <div id='header-content' className='max-w-7xl h-full mx-auto relative'>
        {/* Desktop view */}
        <div className=' hidden lg:flex justify-between items-center gap-4 h-full px-4'>
          <div className='flex-shrink-0'>
            <HeaderLogo />
          </div>
          <div className='flex-1 flex justify-center'>
            <HeaderNav isAuthenticated={!!data} />
          </div>
          <div className='flex-shrink-0 flex items-center gap-4'>
            <HeaderCTA data={data} />
            <HeaderUser data={data} />
            <ModeToggle />
          </div>
        </div>

        {/* Mobile view */}
        <div className=' lg:hidden flex justify-between items-center h-full gap-2'>
          <div className='px-4'>
            <HeaderLogo />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' aria-label='Open menu'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='p-4 flex flex-col h-full overflow-hidden'
            >
              <SheetHeader className='flex-shrink-0 p-0'>
                <ModeToggle />

                <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                <SheetDescription className='sr-only'>
                  Main navigation mobile menu
                </SheetDescription>
              </SheetHeader>

              {/* Scrollable content area */}
              <div className='flex-1 overflow-y-auto flex flex-col gap-4 py-4'>
                <HeaderNav isAuthenticated={!!data} />
              </div>

              {/* CTA buttons - wrapped with SheetClose */}
              {!data && (
                <div className='flex flex-col gap-4 px-2 pb-4'>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant='outline'
                      size='lg'
                      className='w-full'
                    >
                      <Link href={AUTH_ROUTES.LOGIN}>Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant='default'
                      size='lg'
                      className='w-full'
                    >
                      <Link href={AUTH_ROUTES.REGISTER}>Create Account</Link>
                    </Button>
                  </SheetClose>
                </div>
              )}

              {/* User section in footer - fixed at bottom */}
              {data && (
                <SheetFooter className='flex-shrink-0 pt-4 border-t'>
                  <HeaderUser data={data} />
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
        {/* </div> */}
      </div>
    </header>
  );
};

export default Header;
