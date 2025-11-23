'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { useTransition } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [pending, _startTransition] = useTransition();

  return (
    <Card className='w-full max-w-xs mx-auto p-4 sm:p-6'>
      <CardHeader className='flex flex-col items-center justify-center text-center gap-2'>
        <AlertTriangle
          className='text-destructive w-10 h-10 mb-1'
          aria-hidden='true'
        />
        <CardTitle className='text-destructive text-lg sm:text-2xl'>
          Something went wrong
        </CardTitle>
        <CardDescription className='text-sm sm:text-base'>
          An unexpected error occurred. Please try again, go back, or go to the
          home page.
        </CardDescription>
        {error?.message && (
          <div className='text-destructive text-xs mt-2'>
            Error: {error.message}
          </div>
        )}
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <Button
          variant='outline'
          className='w-full mt-2'
          onClick={() => reset()}
          disabled={pending}
        >
          Try Again
        </Button>
        <Button
          variant='secondary'
          className='w-full mt-2'
          onClick={() => router.back()}
        >
          Go Back
        </Button>
        <Button asChild variant='link' className='w-full mt-2'>
          <Link href='/'>Go to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
