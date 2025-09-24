'use client';

import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

function SignInContent() {
  return <AuthForm mode='signin' />;
}

export default function SignInPage() {
  return (
    <div className='max-w-sm mx-auto mt-16 p-6 border rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Logga in</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <SignInContent />
      </Suspense>
    </div>
  );
}
