import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

function RegisterContent() {
  return <AuthForm mode='register' />;
}

export default function RegisterPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='bg-card rounded-xl shadow-lg p-8 border border-border'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-foreground'>
              Create Account
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Create a new account to get started
            </p>
          </div>

          <Suspense
            fallback={
              <div className='flex justify-center items-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
              </div>
            }
          >
            <RegisterContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
