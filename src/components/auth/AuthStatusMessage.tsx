'use client';

import { getAuthStatusMessage } from '@/lib/auth/utils/status-handler';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export function AuthStatusMessage() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const successParam = searchParams.get('success');
  const verifiedParam = searchParams.get('verified');

  let statusObj: any = null;
  if (errorParam) {
    statusObj = getAuthStatusMessage({ code: errorParam });
  }
  if (successParam) {
    statusObj = getAuthStatusMessage({ code: successParam });
  }
  if (verifiedParam === 'true') {
    statusObj = getAuthStatusMessage({ code: 'VERIFIED' });
  }

  if (!statusObj) return null;

  // Map status type to Alert variant (shadcn only has 'default' and 'destructive')
  const variant = statusObj.type === 'error' ? 'destructive' : 'default';

  // Map status type to icon
  const iconMap: Record<string, any> = {
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle2,
  };
  const IconComponent = iconMap[statusObj.type] || Info;

  return (
    <Alert variant={variant}>
      <IconComponent className='h-4 w-4' />
      <AlertTitle>{statusObj.title}</AlertTitle>
      <AlertDescription>{statusObj.message}</AlertDescription>
    </Alert>
  );
}
