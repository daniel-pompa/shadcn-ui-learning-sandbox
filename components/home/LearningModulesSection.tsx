'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { LearningModule } from './types';

const learningModules: LearningModule[] = [
  {
    title: 'Core components',
    description: 'Introduction to design philosophy and basic components of Shadcn/ui.',
    href: 'https://ui.shadcn.com/docs/components',
    badge: 'Fundamentals',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500',
  },
  {
    title: 'Data visualization',
    description:
      'Advanced tables with TanStack Table, sorting, filtering, and pagination.',
    href: 'https://ui.shadcn.com/docs/components/data-table',
    badge: 'Advanced',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    buttonColor:
      'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500',
  },
  {
    title: 'Forms and validation',
    description: 'Comprehensive form handling with React Hook Form and Zod schemas.',
    href: 'https://ui.shadcn.com/docs/forms',
    badge: 'Interactive',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    buttonColor:
      'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500',
  },
  {
    title: 'Theming and dark mode',
    description: 'Global theming and dark mode implementation with Tailwind CSS.',
    href: 'https://ui.shadcn.com/docs/theming',
    badge: 'Styling',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    buttonColor:
      'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500',
  },
];

// Helper for badge colors
const getBadgeColor = (bgColor: string) => {
  const colorMap: Record<string, string> = {
    'bg-blue-50 dark:bg-blue-950/20':
      'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'bg-emerald-50 dark:bg-emerald-950/20':
      'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    'bg-orange-50 dark:bg-orange-950/20':
      'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    'bg-indigo-50 dark:bg-indigo-950/20':
      'bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
  };
  return (
    colorMap[bgColor] ||
    'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300'
  );
};

// Helper for card border colors
const getBorderColor = (bgColor: string) => {
  const borderMap: Record<string, string> = {
    'bg-blue-50 dark:bg-blue-950/20':
      'border-blue-100 hover:border-blue-300 dark:border-blue-900/50 dark:hover:border-blue-800',
    'bg-emerald-50 dark:bg-emerald-950/20':
      'border-emerald-100 hover:border-emerald-300 dark:border-emerald-900/50 dark:hover:border-emerald-800',
    'bg-orange-50 dark:bg-orange-950/20':
      'border-orange-100 hover:border-orange-300 dark:border-orange-900/50 dark:hover:border-orange-800',
    'bg-indigo-50 dark:bg-indigo-950/20':
      'border-indigo-100 hover:border-indigo-300 dark:border-indigo-900/50 dark:hover:border-indigo-800',
  };
  return borderMap[bgColor] || 'border-border hover:border-muted-foreground/30';
};

export const LearningModulesSection = () => {
  return (
    <section className='py-8'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 dark:text-slate-50'>
          Structured learning path
        </h2>
        <p className='text-muted-foreground dark:text-slate-400'>
          Follow these modules to systematically master Shadcn/ui from basics to advanced
          topics.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {learningModules.map((module, index) => (
          <Card
            key={index}
            className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
              module.bgColor
            } ${getBorderColor(module.bgColor)}`}
          >
            <CardHeader>
              <div className='flex items-start justify-between'>
                {/* Visual indicator top left */}
                <div
                  className={`h-1.5 w-10 rounded-full bg-linear-to-r ${module.color}`}
                />
                <Badge variant='outline' className={getBadgeColor(module.bgColor)}>
                  {module.badge}
                </Badge>
              </div>
              <CardTitle className='mt-4 text-xl tracking-tight dark:text-slate-100'>
                {module.title}
              </CardTitle>
              <CardDescription className='text-slate-600 dark:text-slate-400'>
                {module.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className='text-sm space-y-2.5'>
                <div className='flex items-center gap-2.5'>
                  <div
                    className={`h-2 w-2 rounded-full bg-linear-to-r ${module.color}`}
                  />
                  <span className='text-slate-700 dark:text-slate-300'>
                    Interactive examples
                  </span>
                </div>
                <div className='flex items-center gap-2.5'>
                  <div
                    className={`h-2 w-2 rounded-full bg-linear-to-r ${module.color}`}
                  />
                  <span className='text-slate-700 dark:text-slate-300'>
                    Best practices
                  </span>
                </div>
                <div className='flex items-center gap-2.5'>
                  <div
                    className={`h-2 w-2 rounded-full bg-linear-to-r ${module.color}`}
                  />
                  <span className='text-slate-700 dark:text-slate-300'>
                    Real-world patterns
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                asChild
                className={`w-full group ${module.buttonColor} text-white shadow-md transition-all active:scale-95`}
              >
                <Link href={module.href} target='_blank' rel='noopener noreferrer'>
                  Start learning
                  <ArrowRight className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
