import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

function SignInContent() {
  return <AuthForm mode='signin' />;
}

const SignInPage = () => {
  return (
    <>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>Sign In</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Sign in to your account to continue
        </p>
      </div>

      <Suspense
        fallback={
          <div className='flex justify-center items-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          </div>
        }
      >
        <SignInContent />
      </Suspense>
    </>
  );
};

export default SignInPage;
