'use client';
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

import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <>
      <Card className='w-full max-w-xs mx-auto p-4 sm:p-6'>
        <CardHeader className='flex flex-col items-center justify-center text-center gap-2'>
          <AlertTriangle
            className='text-destructive w-10 h-10 mb-1'
            aria-hidden='true'
          />
          <CardTitle className='text-destructive text-lg sm:text-2xl'>
            404 - Page Not Found
          </CardTitle>
          <CardDescription className='text-sm sm:text-base'>
            Sorry, we couldn't find the page you were looking for.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center'>
          <Button
            variant='secondary'
            className='w-full mt-2'
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button asChild variant='outline' className='w-full mt-2'>
            <Link href='/'>Go to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default NotFoundPage;
