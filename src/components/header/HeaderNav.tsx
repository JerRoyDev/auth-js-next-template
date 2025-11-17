'use client';

import NavButton from '../NavButton';

const HeaderNav = () => {
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
      </nav>
    </>
  );
};

export default HeaderNav;
