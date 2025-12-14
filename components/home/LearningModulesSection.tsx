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
import { FaPalette, FaTable } from 'react-icons/fa';
import { SiFormspree } from 'react-icons/si';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import type { LearningModule } from './types';

const learningModules: LearningModule[] = [
  {
    title: 'Core components',
    description: 'Introduction to design philosophy and basic components of Shadcn/ui.',
    icon: <RiLayoutMasonryFill className='h-8 w-8' />,
    href: '/',
    badge: 'Fundamentals',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Data visualization',
    description:
      'Advanced tables with TanStack Table, sorting, filtering, and pagination.',
    icon: <FaTable className='h-8 w-8' />,
    href: '/',
    badge: 'Advanced',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    title: 'Forms and validation',
    description: 'Comprehensive form handling with React Hook Form and Zod schemas.',
    icon: <SiFormspree className='h-8 w-8' />,
    href: '/',
    badge: 'Interactive',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    buttonColor: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    title: 'Theming and dark mode',
    description: 'Global theming and dark mode implementation with Tailwind CSS.',
    icon: <FaPalette className='h-8 w-8' />,
    href: '/',
    badge: 'Styling',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
  },
];

const getBadgeColor = (bgColor: string) => {
  const colorMap: Record<string, string> = {
    'bg-blue-50': 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200',
    'bg-emerald-50':
      'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200',
    'bg-orange-50': 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200',
    'bg-indigo-50': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-indigo-200',
  };
  return (
    colorMap[bgColor] || 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200'
  );
};

export const LearningModulesSection = () => {
  return (
    <section className='py-12'>
      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Structured learning path</h2>
        <p className='text-muted-foreground'>
          Follow these modules to systematically master Shadcn/ui from basics to advanced
          topics
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {learningModules.map((module, index) => (
          <Card
            key={index}
            className={`overflow-hidden border transition-all hover:shadow-xl ${module.bgColor}`}
          >
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className={`p-3 rounded-lg ${module.bgColor}`}>
                  <div className={module.iconColor}>{module.icon}</div>
                </div>
                <Badge className={getBadgeColor(module.bgColor)}>{module.badge}</Badge>
              </div>
              <CardTitle className='mt-4'>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-sm space-y-1'>
                <div className='flex items-center gap-2'>
                  <div
                    className={`h-2 w-2 rounded-full bg-linear-to-r ${module.color}`}
                  />
                  <span>Interactive examples</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div
                    className={`h-2 w-2 rounded-full bg-linear-to-r ${module.color}`}
                  />
                  <span>Best practices</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div
                    className={`h-2 w-2 rounded-full bg-linear-to-r ${module.color}`}
                  />
                  <span>Real-world patterns</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className={`w-full group ${module.buttonColor} text-white`}>
                <Link href={module.href}>
                  Start Learning
                  <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
