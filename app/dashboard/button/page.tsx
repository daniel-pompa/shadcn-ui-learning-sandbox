'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Separator } from '@radix-ui/react-separator';
import { BotIcon, ChevronDownIcon, GitBranchPlus, Mail } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function ButtonDemo() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
      <Button>Default</Button>
      <Button variant='destructive'>Destructive</Button>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='success'>Success</Button>
      <Button variant='warning'>Warning</Button>
      <Button variant='info'>Info</Button>
      <Button disabled>Disabled</Button>
      <Button capitalize onClick={() => console.log('clicked')}>
        Click me
      </Button>
      <Button variant='outline' capitalize>
        <GitBranchPlus /> New branch
      </Button>
      <Button variant='outline' disabled>
        <Spinner />
        Submit
      </Button>
      <Button variant='email' capitalize>
        <Mail /> Login with email
      </Button>
      <Button variant='github' capitalize>
        <FaGithub /> Login with gitHub
      </Button>
      <Button variant='google' capitalize>
        <FaGoogle /> Login with google
      </Button>
      <ButtonGroup className='w-full'>
        <Button variant='outline' className='grow'>
          <BotIcon /> Copilot
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              aria-label='Open Popover'
              className='cursor-pointer'
            >
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='border rounded-xl p-0 text-sm max-w-72 bg-white mt-1'
          >
            <div className='px-4 py-3 border-b'>
              <div className='text-sm font-medium'>Agent Tasks</div>
            </div>
            <Separator />
            <div className='p-4 text-sm *:[p:not(:last-child)]:mb-2'>
              <Textarea
                placeholder='Describe your task in natural language.'
                className='mb-4 resize-none'
              />
              <p className='font-medium'>Start a new task with Copilot</p>
              <p className='text-muted-foreground'>
                Describe your task in natural language. Copilot will work in the
                background and open a pull request for your review.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='link'>Link</Button>
    </div>
  );
}
