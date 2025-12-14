import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const CTASection = () => {
  return (
    <section className='py-12'>
      <div className='max-w-3xl mx-auto text-center'>
        <div className='px-4 py-8 rounded-2xl border bg-gray-50'>
          <h2 className='text-2xl font-bold mb-4'>Ready to start your journey?</h2>
          <p className='text-muted-foreground mb-8'>
            Clone the repository and start experimenting with Shadcn/ui components in a
            practical environment.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild className='px-8'>
              <Link href='/'>
                <Rocket className='h-5 w-5' />
                Launch dashboard
              </Link>
            </Button>
            <Button asChild variant='outline' className='px-8'>
              <Link
                href='https://github.com/daniel-pompa/shadcn-ui-learning-sandbox'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub className='h-5 w-5' />
                View on GitHub
              </Link>
            </Button>
          </div>
          <div className='mt-8 pt-8 border-t'>
            <p className='text-sm text-muted-foreground'>
              Quick start with npm:
              <code className='block mt-2 p-3 bg-muted rounded-lg font-mono text-sm'>
                npx shadcn-ui@latest add [component-name]
              </code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
