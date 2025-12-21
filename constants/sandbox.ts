/**
 * Constants for sandbox/playground URLs
 * Centralized management of external links
 */

export const SANDBOX_CONFIG = {
  // Main sandbox - StackBlitz with Shadcn/ui template
  STACKBLITZ: {
    name: 'StackBlitz',
    url: process.env.NEXT_PUBLIC_SANDBOX_URL_STACKBLITZ || 'https://stackblitz.com',
    description: 'Full Next.js environment with hot reload',
    features: ['Instant preview', 'Terminal access', 'Auto-save'],
    icon: 'Monitor' as const,
  },

  // Alternative sandbox - CodeSandbox
  CODESANDBOX: {
    name: 'CodeSandbox',
    url: process.env.NEXT_PUBLIC_SANDBOX_URL_CODESANDBOX || 'https://codesandbox.io',
    description: 'Lightweight editor for quick prototyping',
    features: ['Simple interface', 'Import from GitHub', 'Collaboration'],
    icon: 'Cloud' as const,
  },

  // GitHub Dev environment
  GITHUB_DEV: {
    name: 'GitHub Dev',
    url: process.env.NEXT_PUBLIC_GITHUB_DEV_URL || 'https://github.dev/shadcn-ui/ui',
    description: 'Edit directly in your browser',
    features: ['Git integration', 'VS Code interface', 'Commit changes'],
    icon: 'Terminal' as const,
  },
} as const;

// Type for sandbox options
export type SandboxType = keyof typeof SANDBOX_CONFIG;
