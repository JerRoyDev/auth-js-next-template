import { requireAdmin } from '@/lib/auth/utils/require-auth';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  // Ensure the user has admin privileges otherwise redirect to unauthorized
  await requireAdmin();
  return <>{children}</>;
};

export default AdminLayout;
