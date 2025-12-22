import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Clock, Share2, Plus } from 'lucide-react';

export const Header = () => {
  return (
    <header className='relative flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 pt-4'>
      <div className='space-y-4'>
        <nav className='flex items-center gap-2 text-sm text-muted-foreground font-medium'>
          <span className='hover:text-foreground cursor-pointer transition-colors'>
            Dashboard
          </span>
          <ChevronRight className='h-3.5 w-3.5' />
          <span className='text-foreground'>Library Overview</span>
        </nav>

        <div className='space-y-1.5'>
          <h1 className='text-4xl font-bold'>Library Overview</h1>
          <p className='text-muted-foreground text-balance'>
            Explore and test our collection of 20+ UI components built with Tailwind CSS
            and Radix UI.
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-3 mt-4'>
          <Badge
            variant='outline'
            className='px-3 py-1 text-xs font-semibold bg-primary/5 border-primary/20 text-primary gap-2'
          >
            <div className='h-1.5 w-1.5 rounded-full bg-primary animate-pulse' />
            v2.4.0
          </Badge>
          <Badge
            variant='secondary'
            className='px-3 py-1 text-xs font-medium border-transparent'
          >
            React 19
          </Badge>
          <Separator orientation='vertical' className='h-4 hidden sm:block mx-1' />
          <span className='text-[13px] text-muted-foreground flex items-center gap-1.5'>
            <Clock className='h-3.5 w-3.5' />
            Last update: 2h ago
          </span>
        </div>
      </div>

      <div className='flex items-center gap-3 w-full md:w-auto'>
        <Button variant='outline' size='sm' className='flex-1 sm:flex-none shadow-sm'>
          <Share2 className='mr-2 h-4 w-4 opacity-70' /> Share
        </Button>
        <Button
          size='sm'
          className='flex-1 sm:flex-none shadow-md shadow-primary/20 bg-primary hover:bg-primary/90'
        >
          <Plus className='mr-2 h-4 w-4' /> New Component
        </Button>
      </div>
    </header>
  );
};
