import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

function RegisterContent() {
  return <AuthForm mode='register' />;
}

export default function RegisterPage() {
  return (
    <>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>Create Account</h1>
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
    </>
  );
}
