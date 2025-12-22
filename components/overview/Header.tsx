'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2, Plus } from 'lucide-react';

export function Header() {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Overview</h1>
        <p className='text-sm text-muted-foreground'>
          Manage your workspace settings, view project metrics and monitor activity.
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' className='h-9 shadow-sm'>
          <Share2 className='mr-2 h-4 w-4 text-gray-500' />
          Share
        </Button>

        <Button variant='outline' size='sm' className='h-9 shadow-sm'>
          <Download className='mr-2 h-4 w-4 text-gray-500' />
          Download Report
        </Button>

        <Button size='sm' className='h-9 bg-blue-600 hover:bg-blue-700 shadow-sm'>
          <Plus className='mr-2 h-4 w-4' />
          New Project
        </Button>
      </div>
    </div>
  );
}
