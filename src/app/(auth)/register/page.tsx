import { AuthForm } from '@/components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <>
      <AuthForm
        mode='register'
        title='Register'
        description='Please enter your details to create an account.'
      />
    </>
  );
}
