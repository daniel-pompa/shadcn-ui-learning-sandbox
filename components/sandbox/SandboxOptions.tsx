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
import { Code2, Monitor, Cloud, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { SANDBOX_CONFIG, type SandboxType } from '@/constants/sandbox';

// Map icon names to Lucide components
const iconMap = {
  Monitor,
  Cloud,
  Terminal,
};

/**
 * SandboxOptions Component
 * Dialog that shows available online code editor options
 * Users can choose their preferred sandbox environment
 */
export const SandboxOptions = () => {
  const [open, setOpen] = useState(false);

  /**
   * Handle sandbox selection
   * Opens the selected sandbox in a new tab and closes dialog
   */
  const handleSandboxSelect = (sandboxType: SandboxType) => {
    const sandbox = SANDBOX_CONFIG[sandboxType];
    window.open(sandbox.url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  /** Helper to get brand-specific colors for badges */
  const getBrandColor = (type: SandboxType) => {
    switch (type) {
      case 'STACKBLITZ':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'CODESANDBOX':
        return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'GITHUB_DEV':
        return 'bg-slate-500/10 text-slate-600 border-slate-200';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant='secondary'
                className='gap-2 font-medium border-primary/10 hover:border-primary/30 transition-all'
              >
                <Code2 className='h-5 w-5' />
                Launch playground
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side='top' className='px-3 py-1.5 text-xs'>
            <p>Open a live development environment</p>
          </TooltipContent>
        </Tooltip>

        <DialogContent className='sm:max-w-xl'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-2xl tracking-tight'>
              <Code2 className='h-8 w-8 bg-gray-900 p-2 rounded text-white font-black' />
              Development environments
            </DialogTitle>
            <DialogDescription className='text-base'>
              Experience the power of Shadcn/ui in real-time. Select a platform to start
              practicing without local setup.
            </DialogDescription>
          </DialogHeader>

          {/* Sandbox options list */}
          <div className='grid gap-4 py-6'>
            {(
              Object.entries(SANDBOX_CONFIG) as [
                SandboxType,
                (typeof SANDBOX_CONFIG)[keyof typeof SANDBOX_CONFIG]
              ][]
            ).map(([key, sandbox]) => {
              const IconComponent = iconMap[sandbox.icon];
              const brandStyle = getBrandColor(key);

              return (
                <button
                  key={key}
                  onClick={() => handleSandboxSelect(key)}
                  className='w-full text-left flex items-start gap-4 p-5 border rounded-xl hover:bg-accent/50 hover:border-primary/40 transition-all duration-300 group cursor-pointer shadow-xs hover:shadow-md'
                >
                  {/* Icon */}
                  <div
                    className={`p-2.5 rounded-lg border transition-colors ${brandStyle}`}
                  >
                    <IconComponent className='h-6 w-6' />
                  </div>

                  {/* Content */}
                  <div className='flex-1 space-y-2.5'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-bold text-lg leading-none'>{sandbox.name}</h3>
                      <ExternalLink className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
                    </div>

                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {sandbox.description}
                    </p>

                    {/* Features list with semantic badges */}
                    <div className='flex flex-wrap gap-2'>
                      {sandbox.features.map(feature => (
                        <Badge
                          key={feature}
                          variant='secondary'
                          className={`text-xs font-semibold py-1 px-2`}
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

          {/* Educational note */}
          <div className='pt-6 border-t'>
            <div className='flex gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10'>
              <Sparkles className='h-5 w-5 text-primary shrink-0 animate-pulse' />
              <p className='text-sm text-muted-foreground leading-normal'>
                <span className='font-bold'>Ready to save your work?</span> Sign in with
                your account and click the <span className='font-bold'>Fork</span> button
                to create your own permanent workspace.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
