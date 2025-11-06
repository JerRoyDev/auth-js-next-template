import { AuthForm } from '@/components/auth/AuthForm';
import PageWrapper from '@/components/PageWrapper';

export default function RegisterPage() {
  return (
    <PageWrapper>
      <AuthForm
        mode='register'
        title='Register'
        description='Please enter your details to create an account.'
      />
    </PageWrapper>
  );
}
