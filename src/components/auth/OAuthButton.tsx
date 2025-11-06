'use client';

import { signIn } from '@/lib/auth/config/auth-client';
import {
  GoogleIcon,
  GitHubIcon,
  DiscordIcon,
  FacebookIcon,
} from './ProviderIcons';
import { Button } from '@/components/ui/button';

interface OAuthButtonProps {
  provider: string;
  callbackUrl?: string;
}

const providerIcons: Record<string, React.JSX.Element> = {
  google: <GoogleIcon size={20} />,
  github: <GitHubIcon size={20} />,
  discord: <DiscordIcon size={20} />,
  facebook: <FacebookIcon size={20} />,
};

export const OAuthButton = ({ provider, callbackUrl }: OAuthButtonProps) => {
  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: callbackUrl,
    });
  };

  const icon = providerIcons[provider] || null;

  return (
    <Button variant='outline' onClick={handleClick} className='gap-2'>
      {icon}
      {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
};
