'use client';
import { useRouter } from 'next/navigation';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Wrench,
  Save,
  Link2,
  LayoutTemplate,
  Terminal,
  Trash2,
  Bookmark,
  Globe,
  User,
} from 'lucide-react';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export default function ContextMenuDemo() {
  const router = useRouter();

  return (
    <ContextMenu>
      <ContextMenuTrigger className='flex h-37.5 w-75 items-center justify-center rounded-md border border-dashed text-sm'>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className='w-52'>
        <ContextMenuItem inset onClick={() => router.back()}>
          <ChevronLeft className='mr-2 h-4 w-4' />
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          <ChevronRight className='mr-2 h-4 w-4' />
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          <RotateCw className='mr-2 h-4 w-4' />
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <Wrench className='mr-2 h-4 w-4' />
            More tools
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='w-44'>
            <ContextMenuItem>
              <Save className='mr-2 h-4 w-4' />
              Save page
            </ContextMenuItem>
            <ContextMenuItem>
              <Link2 className='mr-2 h-4 w-4' />
              Create shortcut
            </ContextMenuItem>
            <ContextMenuItem>
              <LayoutTemplate className='mr-2 h-4 w-4' />
              Name window
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Terminal className='mr-2 h-4 w-4' />
              Developer tools
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant='destructive'>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuCheckboxItem checked>
          <Bookmark className='mr-2 h-4 w-4' />
          Show bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>
          <Globe className='mr-2 h-4 w-4' />
          Show full URLs
        </ContextMenuCheckboxItem>

        <ContextMenuSeparator />

        <ContextMenuRadioGroup value='pedro'>
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value='pedro'>
            <User className='mr-2 h-4 w-4' />
            John Doe
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value='colm'>
            <User className='mr-2 h-4 w-4' />
            Noa Henderson
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
