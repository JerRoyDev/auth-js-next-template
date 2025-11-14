import ContentLayout from '@/components/layouts/ContentLayout';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <ContentLayout maxWidth='7xl'>{children}</ContentLayout>;
};

export default MainLayout;
