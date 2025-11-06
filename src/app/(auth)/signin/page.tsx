import { AuthForm } from '@/components/auth/AuthForm';
import PageWrapper from '@/components/PageWrapper';

export default function SignInPage() {
  return (
    <PageWrapper>
      <AuthForm
        mode='signin'
        title='Sign In'
        description='Please enter your credentials to sign in.'
      />
    </PageWrapper>
  );
}
