'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Info, AlertTriangle, Check, Zap, Clock } from 'lucide-react';

export const TabComponents = () => {
  const roadmapData = [
    {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      task: 'Design phase',
      progress: 65,
      status: 'active',
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      task: 'Backend API',
      progress: 40,
      status: 'review',
    },
    {
      name: 'Ethan Brown',
      email: 'ethan@example.com',
      task: 'UI Components',
      progress: 80,
      status: 'active',
    },
  ];

  return (
    <TabsContent
      value='components'
      className='space-y-6 mt-0 animate-in fade-in-50 duration-500'
    >
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Project roadmap */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 pt-6'>
            <CardTitle className='font-bold'>Project roadmap</CardTitle>
            <CardDescription>Visualizing current development milestones.</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-6'>
            {roadmapData.map((user, i, arr) => (
              <div key={i} className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <Avatar className='h-10 w-10 border'>
                      <AvatarFallback className='bg-primary/10 text-primary'>
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-bold'>{user.name}</p>
                      <p className='text-xs text-muted-foreground'>{user.email}</p>
                    </div>
                  </div>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs'>
                    <span className='font-medium text-muted-foreground'>{user.task}</span>
                    <span className='font-bold'>{user.progress}%</span>
                  </div>
                  <Progress value={user.progress} className='h-2' />
                </div>
                {i !== arr.length - 1 && <Separator className='my-4' />}
              </div>
            ))}
          </CardContent>
          <CardFooter className='bg-muted/30 flex justify-between border-t py-3'>
            <Button variant='ghost' size='sm'>
              View all tasks
            </Button>
            <Button size='sm'>New milestone</Button>
          </CardFooter>
        </Card>

        {/* Alerts and badges */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='font-bold'>System alerts</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Alert variant='info'>
                <Info className='h-4 w-4' />
                <AlertTitle>Update</AlertTitle>
                <AlertDescription className='text-xs'>New v2.0 is live.</AlertDescription>
              </Alert>
              <Alert variant='destructive'>
                <AlertTriangle className='h-4 w-4' />
                <AlertTitle>Memory usage</AlertTitle>
                <AlertDescription className='text-xs'>
                  Server at 92% capacity.
                </AlertDescription>
              </Alert>
              <Alert variant='success'>
                <Check className='h-4 w-4' />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription className='text-xs'>Backup completed.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Quick status</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              <Badge className='bg-emerald-500'>API: online</Badge>
              <Badge variant='secondary'>DB: connected</Badge>
              <Badge variant='outline' className='border-amber-500 text-amber-600'>
                Auth: maintenance
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Resources usage */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='font-bold'>Resource usage</CardTitle>
              <CardDescription>Real-time server metrics</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Zap className='h-4 w-4 text-yellow-500' /> CPU Usage
                  </div>
                  <span className='font-medium'>42%</span>
                </div>
                <Progress value={42} className='h-2' />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Clock className='h-4 w-4 text-blue-500' /> Load average
                  </div>
                  <span className='font-medium'>1.24</span>
                </div>
                <Progress value={65} className='h-2' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};
