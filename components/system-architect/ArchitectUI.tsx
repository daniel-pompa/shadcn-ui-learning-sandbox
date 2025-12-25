'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TechOption } from '@/constants/system-architect';

/* UI components */
export const TechSelector = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: TechOption[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1'>
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='h-11 justify-between bg-white/50 hover:bg-white transition-all border-slate-200 shadow-sm px-3'
          >
            <div className='flex items-center gap-2 truncate'>
              {selected ? (
                <>
                  <selected.icon className={cn('h-4 w-4 shrink-0', selected.color)} />
                  <span className='font-medium text-slate-900'>{selected.label}</span>
                </>
              ) : (
                <span className='text-muted-foreground font-normal'>{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className='h-3.5 w-3.5 opacity-30 shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[--radix-popover-trigger-width] p-1 shadow-xl'
          align='start'
        >
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className='h-9'
            />
            <CommandList>
              <CommandEmpty className='py-4 px-1 text-xs'>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map(opt => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={v => {
                      onChange(v === value ? '' : v);
                      setOpen(false);
                    }}
                    className='flex items-center py-2.5 rounded-md cursor-pointer'
                  >
                    <opt.icon className={cn('mr-2 h-4 w-4', opt.color)} />
                    <span className='text-sm'>{opt.label}</span>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4 text-primary',
                        value === opt.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export function BlueprintRow({
  label,
  value,
  isSet,
}: {
  label: string;
  value: string;
  isSet: boolean;
}) {
  return (
    <div className='flex flex-col gap-1 py-1'>
      <span className='text-[9px] font-black uppercase tracking-widest text-slate-400/80'>
        {label}
      </span>
      <div
        className={cn(
          'text-xs font-mono transition-all',
          isSet ? 'font-bold text-slate-900' : 'text-slate-300'
        )}
      >
        {isSet ? value : '---'}
      </div>
    </div>
  );
}
