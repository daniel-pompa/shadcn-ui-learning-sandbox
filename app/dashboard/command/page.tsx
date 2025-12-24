'use client';

import { useState, useEffect } from 'react';
import { format, isBefore, startOfToday } from 'date-fns';
import {
  Calculator,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export default function CommandDemo() {
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Reference for disabling past dates
  const today = startOfToday();

  // Listen for global shortcuts (CTRL/CMD + P, B, S)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const isShortcut = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      const shortcuts: Record<string, string> = {
        p: 'profile',
        b: 'billing',
        s: 'settings',
      };

      if (isShortcut && key in shortcuts) {
        e.preventDefault();
        setSearch(shortcuts[key]);
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className='flex flex-col gap-6 w-full max-w-xl items-start'>
      {/* Static command component */}
      <Command className='rounded-lg border shadow-md w-full'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>

          <CommandGroup heading='Suggestions'>
            {/* Calendar integration with popover */}
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <CommandItem
                  value='calendar'
                  className='cursor-pointer'
                  onSelect={() => setCalendarOpen(true)}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  <span>Calendar</span>
                  {date && (
                    <span className='ml-2 text-[10px] text-muted-foreground bg-muted px-1 rounded'>
                      {format(date, 'PPP')}
                    </span>
                  )}
                </CommandItem>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={newDate => {
                    setDate(newDate);
                    setCalendarOpen(false); // Close after selection
                  }}
                  disabled={day => isBefore(day, today)}
                />
              </PopoverContent>
            </Popover>

            <CommandItem value='emoji' className='cursor-pointer'>
              <Smile className='mr-2 h-4 w-4' />
              <span>Search emoji</span>
            </CommandItem>

            <CommandItem value='calculator' disabled>
              <Calculator className='mr-2 h-4 w-4' />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading='Settings'>
            <CommandItem
              value='profile'
              className='cursor-pointer'
              onSelect={() => {
                setSearch('profile');
                setOpen(true);
              }}
            >
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>

            <CommandItem
              value='billing'
              className='cursor-pointer'
              onSelect={() => {
                setSearch('billing');
                setOpen(true);
              }}
            >
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>

            <CommandItem
              value='settings'
              className='cursor-pointer'
              onSelect={() => {
                setSearch('settings');
                setOpen(true);
              }}
            >
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>

      {/* Command Dialog (Shortcut-driven) */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Quick search...'
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>

          <CommandGroup heading='Account Actions'>
            <CommandItem
              value='profile'
              className='cursor-pointer'
              onSelect={() => setOpen(false)}
            >
              <User className='mr-2 h-4 w-4' />
              <span>Update Profile & Avatar</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading='Financial'>
            <CommandItem
              value='billing'
              className='cursor-pointer'
              onSelect={() => setOpen(false)}
            >
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Payment Methods & Invoices</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading='System'>
            <CommandItem
              value='settings'
              className='cursor-pointer'
              onSelect={() => setOpen(false)}
            >
              <Settings className='mr-2 h-4 w-4' />
              <span>Global Preferences</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Help Footer */}
      <div className='w-full flex justify-center py-2'>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <p className='flex items-center gap-1'>
            <kbd className='rounded border bg-muted px-2 py-1 font-mono text-xs font-medium'>
              CTRL
            </kbd>
            <span>+</span>
            <kbd className='rounded border bg-muted px-2 py-1 font-mono text-xs font-medium'>
              Key
            </kbd>
          </p>
          <span className='text-xs opacity-50 font-medium uppercase'>or</span>
          <p className='flex items-center gap-1'>
            <kbd className='rounded border bg-muted px-2 py-1 font-mono text-xs font-medium'>
              ⌘
            </kbd>
            <kbd className='ml-1 rounded border bg-muted px-2 py-1 font-mono text-xs font-medium'>
              Key
            </kbd>
          </p>
        </div>
      </div>
    </div>
  );
}
