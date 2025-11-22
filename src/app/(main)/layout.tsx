import ContentLayout from '@/components/layouts/ContentLayout';
import Header from '@/components/header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <ContentLayout maxWidth='7xl'>{children}</ContentLayout>
    </>
  );
};

export default MainLayout;
