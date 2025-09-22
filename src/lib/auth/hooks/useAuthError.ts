import { useSearchParams } from 'next/navigation';
import { parseAuthError, getAuthErrorMessage, shouldDisplayOnSignInPage, getErrorDisplayClasses } from '../utils/error-handler';

/**
 * React hook för att hantera Auth.js fel på sign-in sidan
 */
export function useAuthError() {
  const searchParams = useSearchParams();

  // Hämta error params från URL
  const errorParam = searchParams.get('error');
  const provider = searchParams.get('provider');
  const email = searchParams.get('email');

  // Parse error och få error info
  const errorType = parseAuthError(errorParam);
  const shouldShow = shouldDisplayOnSignInPage(errorType);

  if (!errorParam || !shouldShow) {
    return null;
  }

  const errorInfo = getAuthErrorMessage({
    error: errorType,
    provider: provider || undefined,
    email: email || undefined
  });

  const cssClasses = getErrorDisplayClasses(errorInfo);

  return {
    ...errorInfo,
    cssClasses
  };
}