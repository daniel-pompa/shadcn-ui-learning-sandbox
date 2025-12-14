import { BookOpen, Rocket, LifeBuoy, Sparkles } from 'lucide-react';
import type { Feature } from './types';

const features: Feature[] = [
  {
    title: 'Hands-on learning',
    description: 'Interactive examples and sandbox environment for each component.',
    icon: <BookOpen className='h-5 w-5' />,
  },
  {
    title: 'Modern stack',
    description: 'Built with cutting-edge technologies used in production.',
    icon: <Rocket className='h-5 w-5' />,
  },
  {
    title: 'Accessibility first',
    description: 'Components built on Radix UI for excellent accessibility.',
    icon: <LifeBuoy className='h-5 w-5' />,
  },
  {
    title: 'Production ready',
    description: 'Patterns and practices used in real-world applications.',
    icon: <Sparkles className='h-5 w-5' />,
  },
];

export const FeaturesSection = () => {
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='p-6 rounded-xl border hover:shadow-lg transition-shadow'
          >
            <div className='p-2 rounded-lg bg-primary/10 w-fit mb-4'>{feature.icon}</div>
            <h3 className='font-semibold text-lg mb-2'>{feature.title}</h3>
            <p className='text-sm text-muted-foreground'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
