'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className='flex flex-col gap-6 max-w-xl'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='terms'
            checked={checked}
            onCheckedChange={value => setChecked(!!value)}
          />
          <Label htmlFor='terms' className='dark:text-slate-200'>
            Accept terms and conditions
          </Label>
        </div>

        <Badge
          variant='outline'
          className={cn(
            'transition-all duration-300 border shadow-sm px-2.5 py-0.5',
            checked
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50'
              : 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50'
          )}
        >
          {checked ? <span>Great!</span> : <span>You must accept</span>}
        </Badge>
      </div>

      <div className='flex items-start gap-3'>
        <Checkbox id='terms-2' defaultChecked />
        <div className='grid gap-2'>
          <Label htmlFor='terms-2' className='dark:text-slate-200'>
            Accept terms and conditions
          </Label>
          <p className='text-muted-foreground text-sm'>
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>

      <div className='flex items-start gap-3'>
        <Checkbox id='toggle' disabled />
        <Label htmlFor='toggle' className='text-muted-foreground'>
          Enable notifications
        </Label>
      </div>

      <Label className='hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 transition-colors cursor-pointer has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:border-slate-800 dark:has-aria-checked:border-blue-500 dark:has-aria-checked:bg-blue-950/40'>
        <Checkbox
          id='toggle-2'
          defaultChecked
          className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500'
        />
        <div className='grid gap-1.5 font-normal'>
          <p className='text-sm leading-none font-medium dark:text-slate-100'>
            Enable notifications
          </p>
          <p className='text-muted-foreground text-sm'>
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    </div>
  );
}
