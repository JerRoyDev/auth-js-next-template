import { requireAuth } from '@/lib/auth/utils/require-auth';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { AppHeader } from '@/components/app/AppHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='min-h-[100vh] flex-1 rounded-xl'>{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
