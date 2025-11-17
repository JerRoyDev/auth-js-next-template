import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
  // ...other Button props
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  children,
  className,
  exact = false,
  ...props
}) => {
  const pathname = usePathname();
  const isActive =
    href === '/'
      ? pathname === href
      : exact
        ? pathname === href
        : pathname?.startsWith(href);

  return (
    <Button
      asChild
      variant='ghost'
      className={cn(className)}
      {...props}
    >
      <Link
        href={href}
        className={cn(isActive && 'underline underline-offset-4 font-medium')}
      >
        {children}
      </Link>
    </Button>
  );
};

export default NavButton;
