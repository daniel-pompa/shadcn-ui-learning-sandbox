import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonCard() {
  return (
    <Card className='overflow-hidden flex flex-col h-full'>
      <CardHeader className='flex flex-row items-center gap-4 space-y-0'>
        <Skeleton className='h-10 w-10 rounded-full shrink-0' />
        <div className='flex flex-col gap-2 w-full'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-1/2' />
        </div>
      </CardHeader>

      <CardContent className='space-y-4 flex-1'>
        <div className='space-y-2'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-5/6' />
        </div>
        <div className='flex flex-wrap gap-2'>
          <Skeleton className='h-5 w-16 rounded-md' />
          <Skeleton className='h-5 w-12 rounded-md' />
          <Skeleton className='h-5 w-20 rounded-md' />
        </div>
      </CardContent>

      <CardFooter className='flex justify-end bg-slate-50/50 py-3 border-t'>
        <Skeleton className='h-8 w-24 rounded-md' />
      </CardFooter>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
