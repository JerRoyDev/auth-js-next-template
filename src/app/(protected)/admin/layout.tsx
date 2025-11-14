import ContentLayout from '@/components/layouts/ContentLayout';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <ContentLayout maxWidth='screen-2xl'>{children}</ContentLayout>;
};

export default AdminLayout;
