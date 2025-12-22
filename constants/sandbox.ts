/**
 * Configuration constants for sandbox and playground environments.
 * Provides centralized management for external development links.
 */
export const SANDBOX_CONFIG = {
  /**
   * Primary sandbox: Cloud-based IDE optimized for rapid UI prototyping and architectural exploration. */
  CODESANDBOX: {
    name: 'CodeSandbox',
    url: process.env.NEXT_PUBLIC_SANDBOX_URL_CODESANDBOX || 'https://codesandbox.io',
    description: 'Cloud-based editor designed for rapid prototyping and collaboration.',
    features: [
      'Live collaborative coding',
      'Seamless GitHub integration',
      'Instant deployment previews',
    ],
    icon: 'Cloud' as const,
  },

  /** Alternative sandbox: High-performance environment powered by WebContainers. */
  STACKBLITZ: {
    name: 'StackBlitz',
    url: process.env.NEXT_PUBLIC_SANDBOX_URL_STACKBLITZ || 'https://stackblitz.com',
    description: 'Full-stack Next.js environment with native WebContainer support.',
    features: [
      'Instant hot module replacement',
      'Integrated Node.js terminal',
      'Local-host-like performance',
    ],
    icon: 'Monitor' as const,
  },

  /** Browser-based VS Code experience directly on the GitHub repository. */
  GITHUB_DEV: {
    name: 'GitHub Dev',
    url: process.env.NEXT_PUBLIC_GITHUB_DEV_URL || 'https://github.dev/shadcn-ui/ui',
    description: 'Web-based VS Code interface for direct repository exploration.',
    features: ['Native Git workflow', 'Full VS Code ecosystem', 'Direct branch commits'],
    icon: 'Terminal' as const,
  },
} as const;

/** Type utility to extract available sandbox identifiers. */
export type SandboxType = keyof typeof SANDBOX_CONFIG;
