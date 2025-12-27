'use client';

import * as React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Settings2, Zap } from 'lucide-react';

export default function SliderDemo() {
  const [volume, setVolume] = React.useState([45]);
  const [priceRange, setPriceRange] = React.useState([20, 80]);

  return (
    <div className='w-full max-w-md p-6 border rounded-2xl bg-white shadow-sm space-y-10'>
      {/* Single slider with icon and dynamic label */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Zap className='h-4 w-4' />
            <Label className='text-sm font-semibold'>Performance level</Label>
          </div>
          <span
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-md transition-colors',
              volume[0] > 80 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
            )}
          >
            {volume[0]}%
          </span>
        </div>

        <Slider
          value={volume}
          max={100}
          step={1}
          onValueChange={setVolume}
          className='py-4'
        />
        <p className='text-xs text-slate-400 leading-none'>
          Adjusting this will affect system power consumption.
        </p>
      </div>

      {/* Divider */}
      <div className='h-px bg-slate-100' />

      {/* Range slider with dual tooltips and steps */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Settings2 className='h-4 w-4' />
            <Label className='text-sm font-semibold'>Price threshold</Label>
          </div>
          <div className='flex items-center gap-1 font-mono text-xs text-slate-500'>
            <span>${priceRange[0]}</span>
            <span>—</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className='relative pt-2'>
          <Slider
            value={priceRange}
            min={0}
            max={100}
            step={5}
            minStepsBetweenThumbs={1}
            onValueChange={setPriceRange}
          />

          {/* Visual step markers */}
          <div className='flex justify-between w-full px-1 mt-3'>
            {[0, 25, 50, 75, 100].map(step => (
              <span key={step} className='text-[9px] text-slate-300 font-medium'>
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-slate-50 p-3'>
        <p className='text-xs text-slate-500 text-center italic'>
          &quot;Optimized for touch and keyboard accessibility.&quot;
        </p>
      </div>
    </div>
  );
}
