'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
  LayoutDashboard,
  Settings,
  User,
  House,
} from 'lucide-react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import { TeamSwitcher } from '@/components/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from '@/lib/auth/constants/auth.constants';
import { useSession } from '@/lib/auth/config/auth-client';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession();
  const user = data?.user;

  const navData = {
    teams: [
      {
        name: 'Better Auth',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
    ],
    navMain: [
      {
        title: 'Home',
        url: PUBLIC_ROUTES.HOME,
        icon: House,
      },
      {
        title: 'Dashboard',
        url: PROTECTED_ROUTES.USER_LANDING,
        icon: LayoutDashboard,
      },
      {
        title: 'Profile',
        url: PROTECTED_ROUTES.USER_PROFILE,
        icon: User,
      },
      {
        title: 'Settings',
        url: PROTECTED_ROUTES.USER_SETTINGS,
        icon: Settings,
      },
      ...(user?.role === 'admin'
        ? [
            {
              title: 'Admin',
              url: PROTECTED_ROUTES.ADMIN_LANDING,
              icon: Bot,
              items: [
                {
                  title: 'Overview',
                  url: PROTECTED_ROUTES.ADMIN_LANDING,
                },
                {
                  title: 'Users',
                  url: PROTECTED_ROUTES.ADMIN_USERS,
                },
                {
                  title: 'Settings',
                  url: PROTECTED_ROUTES.ADMIN_SETTINGS,
                },
              ],
            },
          ]
        : []),
    ],
  };

  if (!user) return null;

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
