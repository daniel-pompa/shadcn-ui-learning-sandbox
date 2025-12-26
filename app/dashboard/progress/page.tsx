'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    // Increment progress every 500ms for a smoother feel
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = () => {
    if (progress < 30) return 'bg-slate-400'; // Neutral/Start
    if (progress < 70) return 'bg-amber-500'; // Warning/Progressing
    if (progress < 100) return 'bg-blue-500'; // Active/Processing
    return 'bg-emerald-500'; // Success
  };

  return (
    <>
      <div className='w-full max-w-md space-y-2'>
        <div className='flex justify-between text-xs font-medium text-slate-500'>
          <span>Loading assets...</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className='h-2 w-full' />
      </div>

      <div className='w-full max-w-md space-y-3 p-4 border rounded-xl bg-white shadow-sm mt-5'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            {progress < 100 ? (
              <Loader2 className='h-4 w-4 animate-spin text-slate-500' />
            ) : (
              <CheckCircle2 className='h-4 w-4 text-emerald-500' />
            )}
            <span
              className={cn({
                'text-xs font-semibold text-slate-700': progress < 100,
                'text-xs font-semibold text-emerald-600': progress === 100,
              })}
            >
              {progress < 100 ? 'System synchronizing...' : 'Sync complete'}
            </span>
          </div>
          <span
            className={cn(
              'text-xs font-bold tabular-nums',
              progress === 100 ? 'text-emerald-600' : 'text-slate-500'
            )}
          >
            {progress}%
          </span>
        </div>

        <Progress
          value={progress}
          className='h-1.5' // Thinner bar
          indicatorColor={getStatusColor()}
        />

        <p className='text-xs text-slate-400 text-center uppercase tracking-wider font-medium'>
          {progress < 100 ? 'Optimizing database clusters' : 'All systems operational'}
        </p>
      </div>
    </>
  );
}
