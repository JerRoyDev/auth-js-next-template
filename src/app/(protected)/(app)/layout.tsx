import ContentLayout from '@/components/layouts/ContentLayout';
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <ContentLayout maxWidth='7xl'>{children}</ContentLayout>;
};

export default AppLayout;
