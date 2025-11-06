// src/app/(protected)/admin/page.tsx

import PageWrapper from '@/components/PageWrapper';
import { requireAdmin } from '@/lib/auth/utils/require-auth';

const AdminPage = async () => {
  const session = await requireAdmin();

  return (
    <PageWrapper>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-card shadow-xl rounded-xl p-8 border border-border'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              Admin Panel
            </h1>
            <p className='text-muted-foreground'>
              Welcome,{' '}
              <span className='font-semibold'>{session?.user.email}</span>!
            </p>
            <span className='inline-block mt-2 px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full'>
              Admin
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <div className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Overview
              </h3>
              <p className='text-muted-foreground text-sm'>
                Quick info about system status, users, and recent activities.
              </p>
            </div>

            <div className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                User Management
              </h3>
              <p className='text-muted-foreground text-sm'>
                Manage users, roles, and permissions.
              </p>
            </div>

            <div className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Settings
              </h3>
              <p className='text-muted-foreground text-sm'>
                Adjust system settings and configuration.
              </p>
            </div>

            <div className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Support
              </h3>
              <p className='text-muted-foreground text-sm'>
                Get help, contact info, and documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminPage;
