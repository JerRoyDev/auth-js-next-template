import ContentLayout from '@/components/layouts/ContentLayout';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContentLayout maxWidth='md' centered>
      {children}
    </ContentLayout>
  );
};

export default AuthLayout;
