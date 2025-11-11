// Header.tsx
'use client';

import SignOutButton from '@/components/auth/SignOutButton';
import { useSession } from '@/lib/auth/config/auth-client';
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from '@/lib/auth/constants/auth.constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ModeToggle from '@/components/mode-toggle';
import useScrollPosition from '@/hooks/useScrollInfo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import NavButton from './NavButton';

const Header = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  // Get session data
  const { data, error, isPending } = useSession();
  const { isScrolledY, directionY } = useScrollPosition(50);

  // // Exclude header on auth pages
  // const excludedPaths = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.REGISTER];
  // const pathname = usePathname();
  // if (excludedPaths.includes(pathname)) return null;

  // 2. Define opacity for layers
  const solidOpacity = isScrolledY ? 'opacity-0' : 'opacity-80';
  const maskedOpacity = isScrolledY ? 'opacity-80' : 'opacity-0';

  // 3. Header start (now as a transparent container)
  return (
    <header
      className={
        // Container is fixed and has correct height.
        'fixed top-0 left-0 right-0 z-30 h-16'
      }
    >
      {/* --- BACKGROUND LAYERS --- */}

      {/* LAYER 1: Solid background (for top of page)
      <div
        className={`
          absolute inset-0 z-10 
          bg-card text-foreground shadow-sm border-b border-border 
          transition-opacity duration-200 ease-in-out
          ${solidOpacity}
        `}
      /> */}

      {/* LAYER 2: Masked background (for when scrolled)
      <div
        className={`
          absolute inset-0 z-10 
          bg-card text-foreground 
          mask-b-from-20% mask-b-to-70% 
          transition-opacity duration-300 ease-in-out
          ${maskedOpacity}
        `}
      /> */}
      <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 z-20 relative'>
        <div className='flex justify-between items-center h-16'>
          {/* App logo */}
          <Link
            href={PUBLIC_ROUTES.HOME}
            className={
              'text-xl font-bold hover:opacity-80 transition-colors ' +
              (isScrolledY && ' opacity-0 transition-opacity duration-75 ')
            }
          >
            Better Auth
          </Link>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center space-x-2'>
            {data ? (
              <>
                {/* Dashboard btn */}
                <Button asChild variant='ghost' size='sm'>
                  <Link href={PROTECTED_ROUTES.USER_LANDING}>Dashboard</Link>
                </Button>
                {/* Admin btn */}
                {data.user?.role === 'admin' && (
                  <Button asChild variant='ghost' size='sm'>
                    <Link href={PROTECTED_ROUTES.ADMIN_LANDING}>Admin</Link>
                  </Button>
                )}
                {/* User info */}
                <div className='flex items-center space-x-2'>
                  <Avatar>
                    <AvatarFallback>
                      {data.user?.name
                        ? data.user.name.charAt(0).toUpperCase()
                        : data.user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className='text-sm text-muted-foreground font-medium'>
                    {data.user?.name || data.user?.email}
                  </span>
                  <SignOutButton />
                </div>
              </>
            ) : (
              <>
                {/* Sign in btn */}
                <Button asChild variant='outline' size='sm'>
                  <Link href={AUTH_ROUTES.LOGIN}>Sign In</Link>
                </Button>
                {/* Register btn */}
                <Button asChild variant='default' size='sm'>
                  <Link href={AUTH_ROUTES.REGISTER}>Create Account</Link>
                </Button>
              </>
            )}
            {/* Theme toggle */}
            <ModeToggle />
          </nav>
          {/* ------------------------------------------------------- */}
          {/* Mobile nav */}
          <div className='md:hidden flex items-center'>
            <Sheet>
              <SheetTrigger asChild>
                {/* Menu btn */}
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
                className='p-4 flex flex-col gap-4 h-full'
              >
                <SheetHeader>
                  {/* Sheet title */}
                  <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                  {/* Theme toggle */}
                  <div className='flex items-center justify-between mb-2'>
                    <ModeToggle />
                  </div>
                  {/* Sheet desc */}
                  <SheetDescription className='sr-only'>
                    Main navigation for Better Auth app
                  </SheetDescription>
                </SheetHeader>
                {/* Sheet links */}
                <div className='flex-1 flex flex-col gap-4 justify-start'>
                  {data ? (
                    <>
                      {/* Dashboard link */}
                      <SheetClose asChild>
                        <NavButton href={PROTECTED_ROUTES.USER_LANDING}>
                          Dashboard
                        </NavButton>
                      </SheetClose>
                      {/* Admin link */}
                      {data.user?.role === 'admin' && (
                        <div className='flex flex-col items-center justify-center w-full gap-2 py-2'>
                          <Accordion
                            className='w-full max-w-xs mx-auto'
                            type='single'
                            collapsible
                            defaultValue={
                              isAdminPage ? 'admin-menu' : undefined
                            }
                          >
                            <AccordionItem value='admin-menu'>
                              <AccordionTrigger className='flex items-center justify-center gap-2 text-base font-semibold'>
                                <span>Admin</span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className='flex flex-col items-center gap-2 w-full'>
                                  <SheetClose asChild>
                                    <NavButton
                                      href={PROTECTED_ROUTES.ADMIN_LANDING}
                                      exact
                                    >
                                      Overview
                                    </NavButton>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <NavButton
                                      href={PROTECTED_ROUTES.ADMIN_USERS}
                                      exact
                                    >
                                      Users
                                    </NavButton>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <NavButton href={'/admin/settings'} exact>
                                      Settings
                                    </NavButton>
                                  </SheetClose>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Sign in link */}
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
                      {/* Register link */}
                      <SheetClose asChild>
                        <Button
                          asChild
                          variant='default'
                          size='lg'
                          className='w-full'
                        >
                          <Link href={AUTH_ROUTES.REGISTER}>
                            Create Account
                          </Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
                {/* Sheet footer */}
                {data && (
                  <SheetFooter>
                    {/* User info */}
                    <div className='flex flex-col items-center gap-2 pt-4'>
                      <Avatar>
                        <AvatarFallback>
                          {data.user?.name
                            ? data.user.name.charAt(0).toUpperCase()
                            : data.user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-muted-foreground font-medium'>
                        {data.user?.name || data.user?.email}
                      </span>
                      <SignOutButton />
                    </div>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
