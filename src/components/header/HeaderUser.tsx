'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SignOutButton from '@/components/auth/SignOutButton';
import { PROTECTED_ROUTES } from '@/lib/auth/constants/auth.constants';
import NavButton from '@/components/NavButton';
import Link from 'next/link';

interface HeaderUserProps {
  data: any;
}

const HeaderUser: React.FC<HeaderUserProps> = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {/* Mobile version */}
      <div className='lg:hidden flex flex-col gap-4 w-full'>
        {/* User links */}
        <Accordion className='w-full' type='single' collapsible>
          <AccordionItem value='app-menu' className='border-none'>
            <AccordionTrigger className='text-xs text-muted-foreground font-semibold py-2'>
              User
            </AccordionTrigger>
            <AccordionContent className='pb-2'>
              <div className='flex flex-col gap-1 pl-2'>
                <NavButton href={PROTECTED_ROUTES.USER_LANDING}>
                  Dashboard
                </NavButton>
              </div>
            </AccordionContent>
          </AccordionItem>

          {data.user?.role === 'admin' && (
            <AccordionItem value='admin-menu' className='border-none'>
              <AccordionTrigger className='text-xs text-muted-foreground font-semibold py-2 '>
                Admin
              </AccordionTrigger>
              <AccordionContent className='pb-2'>
                <div className='flex flex-col gap-1 pl-2'>
                  <NavButton href={PROTECTED_ROUTES.ADMIN_LANDING} exact>
                    Overview
                  </NavButton>
                  <NavButton href={PROTECTED_ROUTES.ADMIN_USERS} exact>
                    Users
                  </NavButton>
                  <NavButton href={PROTECTED_ROUTES.ADMIN_SETTINGS} exact>
                    Settings
                  </NavButton>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>

        <div className='flex flex-col items-center gap-2 w-full'>
          <div className='flex items-center'>
            <Avatar className='h-10 w-10'>
              <AvatarFallback className='text-lg'>
                {data.user?.name
                  ? data.user.name.charAt(0).toUpperCase()
                  : data.user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='ml-3 flex flex-col items-start'>
              <span className='text-sm text-muted-foreground font-medium text-center w-full px-2'>
                {data.user?.name || data.user?.email}
              </span>
              <span className='text-xs text-muted-foreground w-full px-2'>
                {data.user?.role}
              </span>
            </div>
          </div>

          <SignOutButton />
        </div>
      </div>

      {/* Desktop version */}
      <div className='hidden lg:flex items-center space-x-2 '>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer'>
              <AvatarFallback>
                {data.user?.name
                  ? data.user.name.charAt(0).toUpperCase()
                  : data.user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='start'>
            <DropdownMenuLabel>
              <div className=' flex flex-col items-center'>
                <span className='text-sm text-muted-foreground font-medium  w-full px-2'>
                  {data.user?.name || data.user?.email}
                </span>
                <span className='text-xs text-muted-foreground w-full px-2'>
                  {data.user?.role}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>User</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={PROTECTED_ROUTES.USER_LANDING}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={PROTECTED_ROUTES.USER_PROFILE}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={PROTECTED_ROUTES.USER_SETTINGS}>Settings</Link>
            </DropdownMenuItem>

            {data.user?.role === 'admin' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={PROTECTED_ROUTES.ADMIN_LANDING}>Overview</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={PROTECTED_ROUTES.ADMIN_USERS}>Users</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={PROTECTED_ROUTES.ADMIN_SETTINGS}>Settings</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />

            <div className='  px-2'>
              <SignOutButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
export default HeaderUser;
