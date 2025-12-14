import Link from 'next/link';
import { Zap } from 'lucide-react';

export const CreditsSection = () => {
  return (
    <div className='border-t py-12 mt-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center gap-2 mb-4 md:mb-0'>
            <Zap className='h-5 w-5 text-primary' />
            <span className='font-bold'>Shadcn/ui learning sandbox</span>
          </div>
          <div className='text-sm text-muted-foreground text-center md:text-right'>
            <p>
              Built by{' '}
              <Link
                href='https://github.com/daniel-pompa'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-primary hover:underline'
              >
                Daniel Pompa
              </Link>
            </p>
            <p className='mt-1'>
              Licensed under{' '}
              <Link
                href='https://choosealicense.com/licenses/mit/'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-primary hover:underline'
              >
                MIT License
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
