import PageWrapper from '@/components/PageWrapper';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const UnauthorizedPage = () => {
  return (
    <PageWrapper>
      <Card className='w-full max-w-xs mx-auto p-4 sm:p-6'>
        <CardHeader className='flex flex-col items-center justify-center text-center gap-2'>
          <AlertTriangle
            className='text-destructive w-10 h-10 mb-1'
            aria-hidden='true'
          />
          <CardTitle className='text-destructive text-lg sm:text-2xl'>
            Access Denied
          </CardTitle>
          <CardDescription className='text-sm sm:text-base'>
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center'>
          <Button asChild variant='outline' className='w-full mt-2'>
            <Link href='/'>Go to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default UnauthorizedPage;
