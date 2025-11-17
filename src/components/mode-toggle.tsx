'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='outline' size='icon'>
        <span className='sr-only'>Toggle theme</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <Button variant='link' size='icon' onClick={toggleTheme}>
      {isDark ? <Moon className='h-2 w-2' /> : <Sun className='h-2 w-2' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
