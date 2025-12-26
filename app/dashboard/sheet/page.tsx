'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Settings2 } from 'lucide-react';

/** * Configuration for the different sides */
const SHEET_CONFIG = [
  { side: 'top', icon: ArrowUp, label: 'Top view' },
  { side: 'bottom', icon: ArrowDown, label: 'Bottom view' },
  { side: 'left', icon: ArrowLeft, label: 'Sidebar left' },
  { side: 'right', icon: ArrowRight, label: 'Sidebar right' },
] as const;

/** Common content for all sheets */
const SheetBody = ({ title, side }: { title: string; side: string }) => (
  <>
    <SheetHeader>
      <div className='flex items-center gap-2 mb-2'>
        <div className='p-2 bg-primary/10 rounded-lg'>
          <Settings2 className='h-5 w-5 text-primary' />
        </div>
        <SheetTitle>{title}</SheetTitle>
      </div>
      <SheetDescription>
        Configure your workspace preferences for the {side} orientation. All changes are
        synchronized in real-time.
      </SheetDescription>
    </SheetHeader>

    <div className='grid gap-4 py-8 border-y my-6 border-slate-100'>
      <div className='text-sm text-slate-400 italic text-center'>
        Content area for {side} panel
      </div>
    </div>

    <SheetFooter className='mt-auto grid grid-cols-2 gap-4'>
      <SheetClose asChild>
        <Button variant='outline' className='flex-1 sm:flex-none'>
          Cancel
        </Button>
      </SheetClose>
      <Button className='flex-1 sm:flex-none'>Save changes</Button>
    </SheetFooter>
  </>
);

export default function SheetDemo() {
  return (
    <div className='flex flex-col gap-6 p-6 border rounded-2xl bg-slate-50/30'>
      <div className='space-y-1'>
        <h2 className='text-base font-semibold text-slate-900'>Sheet layouts</h2>
        <p className='text-sm text-slate-500'>Explore different slide-over positions.</p>
      </div>

      <div className='grid grid-cols-2 lg:flex lg:flex-row gap-3'>
        {SHEET_CONFIG.map(({ side, icon: Icon, label }) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                className='flex items-center justify-center gap-2 h-11 group'
              >
                <Icon className='h-4 w-4 text-slate-400 group-hover:text-primary transition-colors' />
                <span className='text-xs font-medium'>{label}</span>
              </Button>
            </SheetTrigger>

            <SheetContent side={side} className='flex flex-col w-full sm:max-w-md'>
              <SheetBody title={label} side={side} />
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
