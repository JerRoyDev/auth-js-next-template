import { AuthForm } from '@/components/auth/AuthForm';

export default function SignInPage() {
  return (
    <>
      <AuthForm
        mode='signin'
        title='Sign In'
        description='Please enter your credentials to sign in.'
      />
    </>
  );
}
