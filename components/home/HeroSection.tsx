import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Rocket, BookOpen } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section>
      <div className='space-y-6'>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
          <Sparkles className='h-4 w-4' />
          <span className='text-sm font-medium'>Interactive learning environment</span>
        </div>

        <h1 className='text-3xl font-bold tracking-tight'>
          Master{' '}
          <span className='bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
            Shadcn/ui
          </span>{' '}
          through practice
        </h1>

        <p className='text-muted-foreground'>
          A dedicated sandbox for exploring, implementing, and mastering components from
          the Shadcn/ui library. Learn by doing with real examples and best practices.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 pt-2'>
          <Button asChild size='sm'>
            <Link href='/'>
              <Rocket className='h-5 w-5' />
              Explore dashboard
            </Link>
          </Button>
          <Button asChild size='sm' variant='outline'>
            <Link href='https://ui.shadcn.com' target='_blank' rel='noopener noreferrer'>
              <BookOpen className='h-5 w-5' />
              Official docs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
