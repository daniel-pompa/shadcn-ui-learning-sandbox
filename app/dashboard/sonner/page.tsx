'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Loader2,
  CalendarDays,
} from 'lucide-react';

interface DeploymentResult {
  name: string;
  timestamp: string;
}

export default function SonnerTypesDemo() {
  // Custom action toast
  const handleActionToast = () => {
    toast('Message Deleted', {
      description: 'The message has been removed from the server.',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo delete'),
      },
    });
  };

  /** Promise handling with strict typing */
  const handlePromise = () => {
    const promise = (): Promise<DeploymentResult> =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              name: 'System update',
              timestamp: new Date().toLocaleTimeString(),
            }),
          2000
        )
      );

    toast.promise(promise, {
      loading: 'Deploying changes...',
      success: (data: DeploymentResult) => {
        return `${data.name} completed at ${data.timestamp}`;
      },
      error: 'Deployment failed.',
    });
  };

  return (
    <div className='w-full max-w-2xl p-6 border rounded-2xl bg-white shadow-sm space-y-8'>
      <div className='space-y-1'>
        <h3 className='text-sm font-semibold text-slate-900'>Notification System</h3>
        <p className='text-xs text-slate-500'>
          Semantic feedback for every user interaction.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {/* Success */}
        <Button
          variant='outline'
          className='justify-start gap-2 hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50/50'
          onClick={() => toast.success('Changes saved. Your profile is now up to date.')}
        >
          <CheckCircle2 className='h-4 w-4 hover:text-emerald-500' />
          Success
        </Button>

        {/* Info */}
        <Button
          variant='outline'
          className='justify-start gap-2 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50/50'
          onClick={() =>
            toast.info('New update available', {
              description: 'Version 2.0 is ready for download.',
            })
          }
        >
          <Info className='h-4 w-4 hover:text-blue-500' />
          Info
        </Button>

        {/* Warning */}
        <Button
          variant='outline'
          className='justify-start gap-2 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50/50'
          onClick={() => toast.warning('Low storage')}
        >
          <AlertTriangle className='h-4 w-4 hover:text-amber-500' />
          Warning
        </Button>

        {/* Error */}
        <Button
          variant='outline'
          className='justify-start gap-2 hover:text-red-500 hover:border-red-200 hover:bg-red-50/50'
          onClick={() => toast.error('Connection failed. Unable to reach the server.')}
        >
          <AlertCircle className='h-4 w-4 hover:text-red-500' />
          Error
        </Button>

        {/* Promise */}
        <Button variant='outline' className='justify-start gap-2' onClick={handlePromise}>
          <Loader2 className='h-4 w-4 animate-spin text-slate-500' />
          Deploy
        </Button>

        {/* Action */}
        <Button
          variant='outline'
          className='justify-start gap-2 shadow-md'
          onClick={handleActionToast}
        >
          <CalendarDays className='h-4 w-4' />
          Action
        </Button>
      </div>

      <p className='text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest'>
        Click to trigger global events
      </p>
    </div>
  );
}
