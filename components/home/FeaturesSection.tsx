import {
  BookOpen,
  Rocket,
  LifeBuoy,
  Sparkles,
  ShieldCheck,
  Zap,
  Palette,
  Code2,
} from 'lucide-react';
import type { Feature } from './types';

const features: Feature[] = [
  {
    title: 'Hands-on learning',
    description: 'Practical, interactive examples for every component in the library.',
    icon: <BookOpen className='h-5 w-5' />,
  },
  {
    title: 'Modern tech stack',
    description:
      'Built with Next.js 15, Tailwind CSS, and TypeScript for peak performance.',
    icon: <Rocket className='h-5 w-5' />,
  },
  {
    title: 'Accessibility first',
    description: 'Fully compliant with WCAG standards thanks to Radix UI primitives.',
    icon: <LifeBuoy className='h-5 w-5' />,
  },
  {
    title: 'Production ready',
    description: 'Tested patterns ready to be copied and pasted into real-world apps.',
    icon: <Sparkles className='h-5 w-5' />,
  },
  {
    title: 'Live playground',
    description: 'Instant sandbox environments to experiment without local installation.',
    icon: <Zap className='h-5 w-5' />,
  },
  {
    title: 'Clean architecture',
    description: 'Following Shadcn/ui best practices for maintainable and scalable code.',
    icon: <ShieldCheck className='h-5 w-5' />,
  },
  {
    title: 'Full customization',
    description: 'Total control over styles using Tailwind CSS variables and themes.',
    icon: <Palette className='h-5 w-5' />,
  },
  {
    title: 'Developer experience',
    description: 'Optimized workflow with hot-reload and type-safe components.',
    icon: <Code2 className='h-5 w-5' />,
  },
];

export const FeaturesSection = () => {
  return (
    <section className='py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 group'
          >
            <div className='p-2 rounded-lg bg-muted mb-4 w-fit group-hover:scale-110 transition-transform'>
              {feature.icon}
            </div>
            <h3 className='font-bold text-lg mb-2'>{feature.title}</h3>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
