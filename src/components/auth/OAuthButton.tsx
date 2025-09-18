import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { GoogleIcon, GitHubIcon, DiscordIcon, FacebookIcon } from './ProviderIcons';

interface OAuthButtonProps {
  provider: 'google' | 'github' | 'discord' | 'facebook';
  redirectTo?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  disabled?: boolean;
}

const providerConfig = {
  google: {
    name: 'Google',
    icon: GoogleIcon,
    bgColor: 'bg-white hover:bg-gray-50 border border-gray-300',
    textColor: 'text-gray-700',
  },
  github: {
    name: 'GitHub',
    icon: GitHubIcon,
    bgColor: 'bg-gray-900 hover:bg-gray-800',
    textColor: 'text-white',
  },
  discord: {
    name: 'Discord',
    icon: DiscordIcon,
    bgColor: 'bg-indigo-600 hover:bg-indigo-700',
    textColor: 'text-white',
  },
  facebook: {
    name: 'Facebook',
    icon: FacebookIcon,
    bgColor: 'bg-blue-600 hover:bg-blue-700',
    textColor: 'text-white',
  },
} as const;

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function OAuthButton({
  provider,
  redirectTo = '/dashboard',
  size = 'md',
  variant = 'default',
  disabled = false,
}: OAuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const config = providerConfig[provider];
  const IconComponent = config.icon;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(provider, { callbackUrl: redirectTo });
    } catch (error) {
      console.error(`${config.name} sign-in error:`, error);
    } finally {
      setLoading(false);
    }
  };

  const baseClasses = `
    flex items-center justify-center gap-2 
    rounded-lg font-medium transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `.trim();

  const variantClasses =
    variant === 'outline'
      ? 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      : config.bgColor + ' ' + config.textColor;

  return (
    <button
      type='button'
      onClick={handleSignIn}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses[size]}`}
    >
      <IconComponent size={18} />
      {loading ? 'Ansluter...' : `${config.name}`}
    </button>
  );
}
