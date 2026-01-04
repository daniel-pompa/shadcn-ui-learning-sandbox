'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Monitor,
  Cloud,
  Terminal,
  ExternalLink,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { SANDBOX_CONFIG, type SandboxType } from '@/constants/sandbox';

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Cloud,
  Terminal,
};

export const SandboxOptions = () => {
  const [open, setOpen] = useState(false);

  const handleSandboxSelect = (sandboxType: SandboxType): void => {
    const sandbox = SANDBOX_CONFIG[sandboxType];
    window.open(sandbox.url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const getBrandColor = (type: SandboxType): string => {
    switch (type) {
      case 'STACKBLITZ':
        // Azul vibrante para dark mode
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      case 'CODESANDBOX':
        // Ambar cálido para dark mode
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'GITHUB_DEV':
        // Slate/Gris para dark mode
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-block'>
              <DialogTrigger asChild>
                <Button
                  variant='secondary'
                  className='gap-2 font-medium border border-primary/10 dark:border-slate-800 hover:border-primary/30 dark:hover:border-slate-700 transition-all dark:bg-slate-900 dark:hover:bg-slate-800'
                >
                  <Code2 className='h-5 w-5' />
                  Launch playground
                </Button>
              </DialogTrigger>
            </span>
          </TooltipTrigger>

          <TooltipContent side='top' className='px-3 py-1.5 text-xs'>
            <p>Open a live development environment</p>
          </TooltipContent>
        </Tooltip>

        <DialogContent className='sm:max-w-xl text-foreground dark:bg-slate-950 dark:border-slate-800'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-2xl tracking-tight dark:text-slate-50'>
              <div className='bg-foreground dark:bg-slate-100 p-1.5 rounded'>
                <Code2 className='h-5 w-5 text-background dark:text-slate-950' />
              </div>
              Development environments
            </DialogTitle>
            <DialogDescription className='text-base dark:text-slate-400'>
              Experience the power of Shadcn/ui in real-time. Select a platform to start
              practicing without local setup.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-6'>
            {(
              Object.entries(SANDBOX_CONFIG) as [
                SandboxType,
                (typeof SANDBOX_CONFIG)[SandboxType]
              ][]
            ).map(([key, sandbox]) => {
              const IconComponent = iconMap[sandbox.icon] || Monitor;
              const brandStyle = getBrandColor(key);

              return (
                <button
                  key={key}
                  onClick={() => handleSandboxSelect(key)}
                  className='w-full text-left flex items-start gap-4 p-5 border dark:border-slate-800 rounded-xl hover:bg-accent/50 dark:hover:bg-slate-900/50 hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md'
                >
                  <div
                    className={`p-2.5 rounded-lg border transition-colors ${brandStyle}`}
                  >
                    <IconComponent className='h-6 w-6' />
                  </div>

                  <div className='flex-1 space-y-2.5'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-bold text-lg leading-none dark:text-slate-100 group-hover:text-primary transition-colors'>
                        {sandbox.name}
                      </h3>
                      <ExternalLink className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
                    </div>

                    <p className='text-sm text-muted-foreground dark:text-slate-400 leading-relaxed'>
                      {sandbox.description}
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {sandbox.features.map((feature: string) => (
                        <Badge
                          key={feature}
                          variant='secondary'
                          className='text-xs font-semibold py-0.5 px-2 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className='pt-6 border-t dark:border-slate-800'>
            <div className='flex gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 dark:border-primary/20'>
              <Sparkles className='h-5 w-5 text-primary dark:text-primary shrink-0 animate-pulse' />
              <p className='text-sm text-muted-foreground dark:text-slate-400 leading-normal'>
                <span className='font-bold text-foreground dark:text-slate-200'>
                  Ready to save your work?
                </span>{' '}
                Sign in with your account and click the{' '}
                <span className='font-bold text-foreground dark:text-slate-200'>
                  Fork
                </span>{' '}
                button to create your own permanent workspace.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
