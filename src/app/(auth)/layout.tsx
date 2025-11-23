import FadeInWrapper from '@/components/FadeInWrapper';
import Header from '@/components/header/Header';
import ContentLayout from '@/components/layouts/ContentLayout';

import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <FadeInWrapper>
        <ContentLayout maxWidth='md' centered>
          {children}
        </ContentLayout>
      </FadeInWrapper>
    </>
  );
};

export default AuthLayout;
