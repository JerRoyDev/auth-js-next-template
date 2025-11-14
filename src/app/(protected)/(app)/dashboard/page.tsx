import { requireAuth } from '@/lib/auth/utils/require-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const DashboardPage = async () => {
  // Get the authenticated user's session or redirect if not authenticated
  const session = await requireAuth();

  return (
    <Card className='w-full bg-card shadow-xl rounded-xl border border-border'>
      <CardContent className='p-6 md:p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Welcome, {session?.user.name || session?.user.email}!
          </h1>
          <p className='text-muted-foreground'>Email: {session?.user.email}</p>
          {session?.user.role && (
            <Badge className='mt-2 bg-secondary text-secondary-foreground'>
              {session?.user.role}
            </Badge>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
            <CardContent>
              <div className='flex items-center justify-center w-12 h-12 bg-secondary rounded-lg mb-4'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Profile Settings
              </h3>
              <p className='text-muted-foreground text-sm'>
                Manage your account and personal details
              </p>
            </CardContent>
          </Card>

          <Card className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
            <CardContent>
              <div className='flex items-center justify-center w-12 h-12 bg-secondary rounded-lg mb-4'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Recent Activity
              </h3>
              <p className='text-muted-foreground text-sm'>
                See your latest actions and activities
              </p>
            </CardContent>
          </Card>

          <Card className='bg-accent rounded-lg p-6 border border-border hover:bg-muted transition-colors cursor-pointer'>
            <CardContent>
              <div className='flex items-center justify-center w-12 h-12 bg-secondary rounded-lg mb-4'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 17h5l-5 5v-5zM10.586 17H3v-3a2 2 0 112 0v1H7m11-4V9a2 2 0 00-2-2h-1V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2H4a2 2 0 00-2 2v6h9.586l2.707 2.707z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Notifications
              </h3>
              <p className='text-muted-foreground text-sm'>
                Manage your messages and alerts
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
