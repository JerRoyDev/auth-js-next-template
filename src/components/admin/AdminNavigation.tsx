import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

interface AdminNavigationProps {
  items: AdminNavItem[];
}

export function AdminNavigation({ items }: AdminNavigationProps) {
  return (
    <nav className='space-y-2'>
      {items.map((item) => (
        <AdminNavLink key={item.href} {...item} />
      ))}
    </nav>
  );
}

function AdminNavLink({ href, label, icon, description }: AdminNavItem) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
        }
      `}
    >
      <div
        className={`
        h-10 w-10 rounded-lg flex items-center justify-center transition-colors
        ${
          isActive
            ? 'bg-primary-foreground/20'
            : 'bg-muted group-hover:bg-primary/10'
        }
      `}
      >
        {icon}
      </div>
      <div className='flex-1'>
        <div className='text-sm font-medium'>{label}</div>
        {description && (
          <div
            className={`text-xs ${
              isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}
          >
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
