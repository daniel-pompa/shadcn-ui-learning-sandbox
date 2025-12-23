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
          <Label htmlFor='terms'>Accept terms and conditions</Label>
        </div>

        <Badge
          variant='outline'
          className={cn(
            'transition-all duration-300 border shadow-sm px-2.5 py-0.5',
            checked
              ? 'bg-emerald-50 text-emerald-500 border-emerald-200 hover:bg-emerald-100 hover:text-green-500'
              : 'bg-amber-50 text-amber-500 border-amber-200 hover:bg-amber-100 hover:text-amber-500'
          )}
        >
          {checked ? <span>Great!</span> : <span>You must accept</span>}
        </Badge>
      </div>
      <div className='flex items-start gap-3'>
        <Checkbox id='terms-2' defaultChecked />
        <div className='grid gap-2'>
          <Label htmlFor='terms-2'>Accept terms and conditions</Label>
          <p className='text-muted-foreground text-sm'>
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div className='flex items-start gap-3'>
        <Checkbox id='toggle' disabled />
        <Label htmlFor='toggle'>Enable notifications</Label>
      </div>
      <Label className='hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950'>
        <Checkbox
          id='toggle-2'
          defaultChecked
          className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
        />
        <div className='grid gap-1.5 font-normal'>
          <p className='text-sm leading-none font-medium'>Enable notifications</p>
          <p className='text-muted-foreground text-sm'>
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    </div>
  );
}
