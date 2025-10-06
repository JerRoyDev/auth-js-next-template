import { credentialsProvider } from "./credentials.provider";
import { oauthProviders } from "./oauth.providers";

/**
 * * Combined providers array and provider map for dynamic rendering
 */

// Combine all providers
export const providers = [credentialsProvider, ...oauthProviders];

// Export provider map for dynamic rendering in custom pages
export const providerMap = providers.map((provider) => ({
  id: provider.id,
  name: provider.name,
}));