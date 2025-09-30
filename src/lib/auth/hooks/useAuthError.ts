import { useSearchParams } from 'next/navigation';
import { parseAuthError, getAuthErrorMessage, shouldDisplayOnSignInPage, getErrorDisplayClasses } from '../utils/error-handler';

/**
 * React hook to handle Auth.js errors on the sign-in page
 */
export function useAuthError() {
  const searchParams = useSearchParams();

  // Read error params from the URL
  const errorParam = searchParams.get('error');
  const provider = searchParams.get('provider');
  const email = searchParams.get('email');

  // Parse error and get structured error info
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