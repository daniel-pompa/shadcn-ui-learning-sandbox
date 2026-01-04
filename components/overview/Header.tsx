'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout, BookOpen, Component } from 'lucide-react';

export const Header = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-10 border-b dark:border-slate-800 pb-6 transition-colors'>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-3xl lg:text-4xl font-bold dark:text-slate-50'>Overview</h1>
          <Badge
            variant='default'
            className='ml-2 mt-3 dark:bg-slate-100 dark:text-slate-900'
          >
            Next.js 16.0.10
          </Badge>
        </div>
        <p className='text-muted-foreground dark:text-slate-400'>
          Explore the implementation of Shadcn/ui components. A curated showcase of
          interactive patterns and best practices for modern web development.
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <Button
          variant='outline'
          size='sm'
          className='px-4 font-medium dark:border-slate-800 dark:hover:bg-slate-900 transition-all'
        >
          <BookOpen className='h-4 w-4 text-slate-500 dark:text-slate-400' />
          Documentation
        </Button>

        <Button
          variant='outline'
          size='sm'
          className='px-4 font-medium dark:border-slate-800 dark:hover:bg-slate-900 transition-all'
        >
          <Layout className='h-4 w-4 text-slate-500 dark:text-slate-400' />
          View source
        </Button>

        <Button
          size='sm'
          className='px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95'
        >
          <Component className='h-4 w-4' />
          Try components
        </Button>
      </div>
    </div>
  );
};
