'use client';

import { signInOAuthAction } from '@/lib/auth/actions/signInOAuth.action';
import { useFormStatus } from 'react-dom';
import { providerMap } from '@/lib/auth/config/auth.config';
import {
  GoogleIcon,
  GitHubIcon,
  DiscordIcon,
  FacebookIcon,
} from './ProviderIcons';

// Derive provider type from actual config
type ProviderType = (typeof providerMap)[number]['id'];

interface OAuthButtonProps {
  provider: ProviderType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  disabled?: boolean;
}

// Letter icon for unknown providers - shows first letter of provider name
const LetterIcon = ({
  letter,
  size = 18,
}: {
  letter: string;
  size?: number;
}) => (
  <div
    className='flex items-center justify-center rounded font-bold text-sm'
    style={{
      width: size,
      height: size,
      fontSize: size * 0.6,
      backgroundColor: 'rgba(255,255,255,0.2)',
    }}
  >
    {letter.toUpperCase()}
  </div>
);

// Function to create default config for unknown providers
const createDefaultConfig = (provider: string) => ({
  name: provider.charAt(0).toUpperCase() + provider.slice(1),
  icon: ({ size }: { size?: number }) => (
    <LetterIcon letter={provider.charAt(0)} size={size} />
  ),
  bgColor:
    'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
  textColor: 'text-white',
});

const providerConfig: Partial<
  Record<
    ProviderType,
    {
      name: string;
      icon: React.ComponentType<{ size?: number }>;
      bgColor: string;
      textColor: string;
    }
  >
> = {
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
  // * Add more provider-specific configs as needed
  // example for Twitter:

  /* twitter: {
    name: 'Twitter',
    icon: TwitterIcon,
    bgColor: 'bg-blue-400 hover:bg-blue-500',
    textColor: 'text-white',
  }, */
} as const;

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

function OAuthButtonContent({
  provider,
  size = 'md',
  variant = 'default',
  disabled = false,
}: OAuthButtonProps) {
  const { pending } = useFormStatus();

  // Use specific config or fallback to default
  const config = providerConfig[provider] || createDefaultConfig(provider);

  const IconComponent = config.icon;

  const baseClasses = `
    w-full flex items-center justify-center gap-3 
    rounded-lg font-semibold transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    shadow-sm hover:shadow-md
  `.trim();

  const variantClasses =
    variant === 'outline'
      ? 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      : config.bgColor + ' ' + config.textColor;

  return (
    <button
      type='submit'
      disabled={disabled || pending}
      className={`${baseClasses} ${variantClasses} ${sizeClasses[size]}`}
    >
      <IconComponent size={20} />
      {pending ? 'Loading...' : `${config.name}`}
    </button>
  );
}

export function OAuthButton({
  provider,
  size = 'md',
  variant = 'default',
  disabled = false,
}: OAuthButtonProps) {
  return (
    <form action={() => signInOAuthAction(provider)}>
      <OAuthButtonContent
        provider={provider}
        size={size}
        variant={variant}
        disabled={disabled}
      />
    </form>
  );
}
