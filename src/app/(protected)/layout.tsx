import { requireAuth } from '@/lib/auth/utils/require-auth';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { AppHeader } from '@/components/app/AppHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ContentLayout from '@/components/layouts/ContentLayout';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <ContentLayout maxWidth='screen-2xl' noTopMargin>
          {children}
        </ContentLayout>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
