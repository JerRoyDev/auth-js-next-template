'use client';

import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';
import NavButton from '../NavButton';

interface HeaderNavProps {
  isAuthenticated?: boolean;
}

const HeaderNav = ({ isAuthenticated }: HeaderNavProps) => {
  const mobileNavBtnClass = 'text-base text-sm w-full';

  return (
    <>
      {/* Mobile version - visible in Sheet */}
      <nav className='lg:hidden flex flex-col gap-1 w-full'>
        <NavButton href='/' className={`${mobileNavBtnClass} `}>
          Home
        </NavButton>
        <NavButton href='/about' className={`${mobileNavBtnClass} `}>
          About
        </NavButton>
        <NavButton href='/faq' className={`${mobileNavBtnClass} `}>
          FAQ
        </NavButton>
        <NavButton href='/contact' className={`${mobileNavBtnClass} `}>
          Contact
        </NavButton>
        {isAuthenticated && (
          <NavButton
            href={PROTECTED_ROUTES.USER_LANDING}
            className={`${mobileNavBtnClass} font-semibold text-primary`}
          >
            Dashboard
          </NavButton>
        )}
      </nav>

      {/* Desktop version */}
      <nav className='hidden lg:flex items-center gap-2'>
        <NavButton href='/' className='text-base font-medium hover:underline'>
          Home
        </NavButton>
        <NavButton
          href='/about'
          className='text-base font-medium hover:underline'
        >
          About
        </NavButton>
        <NavButton
          href='/faq'
          className='text-base font-medium hover:underline'
        >
          FAQ
        </NavButton>
        <NavButton
          href='/contact'
          className='text-base font-medium hover:underline'
        >
          Contact
        </NavButton>
        {isAuthenticated && (
          <NavButton
            href={PROTECTED_ROUTES.USER_LANDING}
            className='text-base hover:underline text-primary font-semibold'
          >
            Dashboard
          </NavButton>
        )}
      </nav>
    </>
  );
};

export default HeaderNav;
