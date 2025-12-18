import { BadgeCheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export default function BadgeDemo() {
  return (
    <div className='flex w-full flex-wrap gap-3'>
      <Badge>badge</Badge>
      <Badge variant='secondary'>secondary</Badge>
      <Badge variant='destructive'>destructive</Badge>
      <Badge variant='outline'>outline</Badge>
      <Badge variant='success'>
        <BadgeCheckIcon />
        verified
      </Badge>
      <Badge variant='info'>info</Badge>
      <Badge variant='warning'>warning</Badge>
      <Badge className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'>8</Badge>
      <Badge
        className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'
        variant='destructive'
      >
        99
      </Badge>
      <Badge
        className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'
        variant='outline'
      >
        20+
      </Badge>
    </div>
  );
}
