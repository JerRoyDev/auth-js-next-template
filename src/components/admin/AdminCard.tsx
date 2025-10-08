import { ReactNode } from 'react';

interface AdminCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function AdminCard({
  title,
  description,
  children,
  className = '',
}: AdminCardProps) {
  return (
    <div
      className={`bg-card rounded-xl p-6 shadow-sm border border-border ${className}`}
    >
      <div className='mb-4'>
        <h2 className='text-xl font-semibold text-foreground'>{title}</h2>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
}

export function AdminStatCard({
  title,
  value,
  icon,
  description,
  className = '',
}: AdminStatCardProps) {
  return (
    <div
      className={`bg-card rounded-xl p-6 shadow-sm border border-border ${className}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>{title}</p>
          <p className='text-2xl font-bold text-foreground'>{value}</p>
          {description && (
            <p className='text-xs text-muted-foreground mt-1'>{description}</p>
          )}
        </div>
        <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center'>
          {icon}
        </div>
      </div>
    </div>
  );
}
