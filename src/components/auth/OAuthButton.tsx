'use client';

import { signIn } from '@/lib/auth/config/auth-client';
import {
  GoogleIcon,
  GitHubIcon,
  DiscordIcon,
  FacebookIcon,
} from './ProviderIcons';

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
    <div>
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg shadow-sm bg-card text-foreground text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors`}
      >
        {icon}
        {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </button>
    </div>
  );
};
