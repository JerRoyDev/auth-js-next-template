import { requireAdmin } from '@/lib/auth/utils/require-auth';

const AdminPage = async () => {
  const session = await requireAdmin();

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>Admin Panel</h1>
      <p>Welcome, {session?.user.email}!</p>
    </div>
  );
};

export default AdminPage;
