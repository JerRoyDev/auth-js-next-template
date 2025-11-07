import { OAuthButton } from './OAuthButton';

interface OAuthButtonGroupProps {
  callbackUrl?: string;
}

export function OAuthButtonGroup({ callbackUrl }: OAuthButtonGroupProps) {
  return (
    <div className='w-full flex flex-wrap justify-center gap-3'>
      <OAuthButton provider='google' callbackUrl={callbackUrl} />
      <OAuthButton provider='github' callbackUrl={callbackUrl} />
      <OAuthButton provider='discord' callbackUrl={callbackUrl} />
      <OAuthButton provider='facebook' callbackUrl={callbackUrl} />
    </div>
  );
}
