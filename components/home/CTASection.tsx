'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const CTASection = () => {
  return (
    <section className='py-12'>
      <div className='max-w-3xl mx-auto text-center'>
        <div className='px-4 py-8 rounded-2xl border dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 transition-colors'>
          <h2 className='text-2xl font-bold mb-4 dark:text-slate-50'>
            Ready to start your journey?
          </h2>
          <p className='text-muted-foreground dark:text-slate-400 mb-8'>
            Clone the repository and start experimenting with Shadcn/ui components in a
            practical environment.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {/* Primary CTA: Component gallery */}
            <Button
              asChild
              className='gap-2 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90'
            >
              <Link href='/dashboard/overview'>
                <LayoutGrid className='h-5 w-5' />
                Enter component gallery
              </Link>
            </Button>

            {/* Secondary CTA: View on GitHub */}
            <Button
              asChild
              variant='outline'
              className='px-8 dark:border-slate-800 dark:hover:bg-slate-800 transition-all'
            >
              <Link
                href='https://github.com/daniel-pompa/shadcn-ui-learning-sandbox'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2'
              >
                <FaGithub className='h-5 w-5' />
                View on GitHub
              </Link>
            </Button>
          </div>
          <div className='mt-8 pt-8 border-t dark:border-slate-800'>
            <p className='text-xs sm:text-sm text-muted-foreground dark:text-slate-500'>
              Quick start with npm:
              <code className='text-xs sm:text-sm block mt-2 p-3 bg-muted dark:bg-slate-900 rounded-lg font-mono dark:text-slate-300 border dark:border-slate-800'>
                npx shadcn-ui@latest add [component-name]
              </code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
