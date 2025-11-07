'use client';

import { signIn } from '@/lib/auth/config/auth-client';
import { SiGithub, SiGoogle, SiFacebook, SiDiscord } from 'react-icons/si';
import { Button } from '@/components/ui/button';

interface OAuthButtonProps {
  provider: string;
  callbackUrl?: string;
}

const providerIcons: Record<string, React.ReactNode> = {
  google: <SiGoogle size={18} />,
  github: <SiGithub size={18} />,
  discord: <SiDiscord size={18} />,
  facebook: <SiFacebook size={18} />,
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
    <Button
      variant='outline'
      onClick={handleClick}
      className='gap-2 w-full min-w-[140px] justify-center'
    >
      {icon}
      <span className='capitalize'>{provider}</span>
    </Button>
  );
};
