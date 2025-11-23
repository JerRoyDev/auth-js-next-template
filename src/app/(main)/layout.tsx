import ContentLayout from '@/components/layouts/ContentLayout';
import Header from '@/components/header/Header';
import FadeInWrapper from '@/components/FadeInWrapper';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <FadeInWrapper>
        <ContentLayout maxWidth='7xl'>{children}</ContentLayout>
      </FadeInWrapper>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
