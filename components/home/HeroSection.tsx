import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, BookOpen, Code2, LayoutGrid } from 'lucide-react';
import { SANDBOX_CONFIG } from '@/constants/sandbox';
import { SandboxOptions } from '@/components/sandbox/SandboxOptions';

export const HeroSection = () => {
  // Get the main sandbox URL from environment variable or fallback
  const mainSandboxUrl = SANDBOX_CONFIG.CODESANDBOX.url;

  return (
    <section className='relative'>
      <div className='space-y-6'>
        {/* Badge for interactive learning */}
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-pulse'>
          <Rocket className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium text-primary'>
            Interactive learning environment
          </span>
        </div>

        {/* Main heading */}
        <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
          Master{' '}
          <span className='bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
            shadcn/ui
          </span>{' '}
          through practice
        </h1>

        {/* Description */}
        <p className='text-lg text-muted-foreground'>
          The ultimate playground for modern UI developers. Explore, implement, and
          customize high-end components from the Shadcn/ui library in a production-ready
          environment without the friction of local setup. Learn by doing with real
          examples and best practices.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 pt-4'>
          {/* Primary CTA: Component gallery */}
          <Button asChild className='gap-2'>
            <Link href='/dashboard/overview'>
              <LayoutGrid className='h-5 w-5' />
              Enter component gallery
            </Link>
          </Button>

          {/* Sandbox CTA - Using the dialog component */}
          <SandboxOptions />

          {/* Secondary CTA: Official docs */}
          <Button asChild variant='outline' className='gap-2'>
            <Link href='https://ui.shadcn.com' target='_blank' rel='noopener noreferrer'>
              <BookOpen className='h-5 w-5' />
              Official docs
            </Link>
          </Button>
        </div>

        {/* Sandbox quick link for power users */}
        <div className='pt-4 flex flex-col md:flex-row items-baseline gap-4'>
          <p className='text-muted-foreground'>Prefer to jump directly into coding?</p>
          <Button asChild size='sm' variant='outline'>
            <Link
              href={mainSandboxUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1'
            >
              <Code2 className='h-4 w-4' />
              <span>Open direct sandbox link</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
