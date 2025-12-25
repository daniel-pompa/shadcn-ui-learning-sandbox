import {
  Globe,
  Server,
  Database,
  Cloud,
  Terminal,
  Layers,
  Box,
  Layout,
  Shield,
  Activity,
  Zap,
  TestTube,
  LucideIcon,
} from 'lucide-react';

export interface TechOption {
  value: string;
  label: string;
  icon: LucideIcon;
  color?: string;
}

/* Data stacks */
export const clientFrameworks: TechOption[] = [
  { value: 'nextjs', label: 'Next.js 16', icon: Globe, color: 'text-blue-600' },
  { value: 'sveltekit', label: 'SvelteKit', icon: Globe, color: 'text-orange-600' },
  { value: 'remix', label: 'Remix', icon: Zap, color: 'text-indigo-600' },
];

export const clientRuntime: TechOption[] = [
  { value: 'react', label: 'React', icon: Layout, color: 'text-cyan-500' },
  { value: 'tailwind', label: 'Tailwind CSS', icon: Box, color: 'text-sky-500' },
  { value: 'shadcn', label: 'shadcn/ui', icon: Layers, color: 'text-slate-900' },
  { value: 'tanstack', label: 'TanStack Query', icon: Activity, color: 'text-rose-500' },
];

export const serverRuntime: TechOption[] = [
  { value: 'node', label: 'Node.js', icon: Server, color: 'text-green-600' },
  { value: 'nestjs', label: 'NestJS', icon: Server, color: 'text-red-600' },
  { value: 'fastapi', label: 'FastAPI', icon: Terminal, color: 'text-teal-600' },
];

export const persistenceLayer: TechOption[] = [
  { value: 'postgres', label: 'PostgreSQL', icon: Database, color: 'text-blue-700' },
  { value: 'mongodb', label: 'MongoDB', icon: Database, color: 'text-green-600' },
  { value: 'supabase', label: 'Supabase DB', icon: Cloud, color: 'text-emerald-500' },
];

export const dataAccess: TechOption[] = [
  { value: 'prisma', label: 'Prisma ORM', icon: Box, color: 'text-slate-800' },
  { value: 'typeorm', label: 'TypeORM', icon: Layers, color: 'text-orange-500' },
  { value: 'mongoose', label: 'Mongoose ODM', icon: Database, color: 'text-red-800' },
];

export const securityLayer: TechOption[] = [
  { value: 'nextauth', label: 'NextAuth', icon: Shield, color: 'text-indigo-600' },
  { value: 'clerk', label: 'Clerk Managed Auth', icon: Shield, color: 'text-purple-600' },
  {
    value: 'supabase-auth',
    label: 'Supabase Auth',
    icon: Shield,
    color: 'text-emerald-600',
  },
];

export const qualityAssurance: TechOption[] = [
  {
    value: 'vitest',
    label: 'Vitest',
    icon: TestTube,
    color: 'text-yellow-500',
  },
  {
    value: 'playwright',
    label: 'Playwright',
    icon: TestTube,
    color: 'text-green-600',
  },
];

export const cloudInfrastructure: TechOption[] = [
  { value: 'vercel', label: 'Vercel', icon: Cloud, color: 'text-black' },
  { value: 'aws', label: 'AWS', icon: Cloud, color: 'text-orange-500' },
  { value: 'docker', label: 'Docker', icon: Box, color: 'text-blue-500' },
];
