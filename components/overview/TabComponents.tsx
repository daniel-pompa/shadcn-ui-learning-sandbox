'use client';

import { useState } from 'react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import {
  Info,
  AlertTriangle,
  Check,
  Zap,
  Clock,
  Activity,
  ArrowUpRight,
  UserPlus,
} from 'lucide-react';

export const TabComponents = () => {
  // State for dynamic roadmap data
  const [roadmapData, setRoadmapData] = useState([
    {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      task: 'Design system architecture',
      progress: 65,
      status: 'active',
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      task: 'Backend api integration',
      progress: 40,
      status: 'review',
    },
    {
      name: 'Ethan Brown',
      email: 'ethan@example.com',
      task: 'Ui components library',
      progress: 80,
      status: 'active',
    },
  ]);

  // Helper function for status styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30 hover:bg-emerald-500/20';
      case 'review':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30 hover:bg-amber-500/20';
      case 'pending':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 dark:border-sky-500/30 hover:bg-sky-500/20';
      default:
        return '';
    }
  };

  // Action handlers
  const handleAddMilestone = () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      task: 'Documentation setup',
      progress: 5,
      status: 'pending',
    };
    setRoadmapData([...roadmapData, newUser]);
    toast.success('New milestone created', {
      description: 'A new contributor has been assigned to the roadmap.',
    });
  };

  const handleViewTasks = () => {
    toast.info('Loading task dashboard', {
      description: 'Redirecting to the full project board.',
    });
  };

  return (
    <TabsContent
      value='components'
      className='space-y-6 mt-0 animate-in fade-in-50 duration-500 transition-colors'
    >
      <TooltipProvider>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Project roadmap section */}
          <Card className='shadow-sm py-0 flex flex-col dark:border-slate-800 dark:bg-slate-950/50'>
            <CardHeader className='border-b dark:border-slate-800 bg-muted/30 pt-6'>
              <CardTitle className='text-base dark:text-slate-100'>
                Project roadmap
              </CardTitle>
              <CardDescription className='dark:text-slate-400'>
                Visualizing current development milestones.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-6 space-y-6 grow'>
              {roadmapData.map((user, i, arr) => (
                <div key={i} className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <Avatar className='h-10 w-10 border dark:border-slate-800 shadow-sm'>
                        <AvatarFallback className='bg-primary/10 text-primary dark:text-blue-400 uppercase text-xs'>
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm dark:text-slate-200'>{user.name}</p>
                        <p className='text-xs text-muted-foreground dark:text-slate-500'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant='outline'
                      className={`text-[10px] capitalize transition-colors ${getStatusStyles(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-xs'>
                      <span className='font-medium text-muted-foreground dark:text-slate-400'>
                        {user.task}
                      </span>
                      <span className='dark:text-slate-300'>{user.progress}%</span>
                    </div>
                    <Progress value={user.progress} className='h-2 dark:bg-slate-800' />
                  </div>
                  {i !== arr.length - 1 && (
                    <Separator className='my-4 dark:bg-slate-800' />
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className='bg-muted/30 flex justify-between border-t dark:border-slate-800 py-5'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleViewTasks}
                    className='dark:hover:bg-slate-900 dark:text-slate-300'
                  >
                    View all tasks
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open full management board</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='sm'
                    onClick={handleAddMilestone}
                    className='dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500'
                  >
                    New milestone
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='dark:bg-slate-800 dark:text-slate-200 border-slate-700'>
                  <p>Assign new team goal</p>
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>

          {/* System status and alerts column */}
          <div className='space-y-6'>
            <Card className='shadow-sm dark:border-slate-800 dark:bg-slate-950/50'>
              <CardHeader>
                <CardTitle className='text-base dark:text-slate-100'>
                  System alerts
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Alert
                  variant='info'
                  className='bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50'
                >
                  <Info className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                  <AlertTitle className='text-blue-700 dark:text-blue-300 text-sm'>
                    Update
                  </AlertTitle>
                  <AlertDescription className='text-xs text-blue-600 dark:text-blue-400/80'>
                    New v2.0 is live.
                  </AlertDescription>
                </Alert>
                <Alert
                  variant='destructive'
                  className='bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50'
                >
                  <AlertTriangle className='h-4 w-4' />
                  <AlertTitle className='text-sm'>Memory usage</AlertTitle>
                  <AlertDescription className='text-xs'>
                    Server at 92% capacity.
                  </AlertDescription>
                </Alert>
                <Alert
                  variant='success'
                  className='bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50 transition-colors'
                >
                  <Check className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                  <AlertTitle className='text-emerald-700 dark:text-emerald-300 text-sm'>
                    Success
                  </AlertTitle>
                  <AlertDescription className='text-xs text-emerald-600 dark:text-emerald-400/80'>
                    Backup completed.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className='shadow-sm dark:border-slate-800 dark:bg-slate-950/50'>
              <CardHeader>
                <CardTitle className='text-base dark:text-slate-100'>
                  Quick status
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                <Badge
                  variant='outline'
                  className='border-none text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60'
                >
                  Api: online
                </Badge>
                <Badge
                  variant='outline'
                  className='border-none bg-muted dark:bg-slate-800 dark:text-slate-300'
                >
                  Db: connected
                </Badge>
                <Badge
                  variant='outline'
                  className='border-none text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60'
                >
                  Auth: maintenance
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Metrics and activity log column */}
          <div className='space-y-6'>
            <Card className='shadow-sm dark:border-slate-800 dark:bg-slate-950/50'>
              <CardHeader>
                <CardTitle className='text-base dark:text-slate-100'>
                  Resource usage
                </CardTitle>
                <CardDescription className='dark:text-slate-400'>
                  Real-time server metrics
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2 text-muted-foreground dark:text-slate-400 font-medium'>
                      <Zap className='h-4 w-4 text-yellow-500' /> CPU usage
                    </div>
                    <span className='dark:text-slate-300'>42%</span>
                  </div>
                  <Progress value={42} className='h-2 bg-muted dark:bg-slate-800' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2 text-muted-foreground dark:text-slate-400 font-medium'>
                      <Clock className='h-4 w-4 text-blue-500 dark:text-blue-400' /> Load
                      average
                    </div>
                    <span className='dark:text-slate-300'>1.24</span>
                  </div>
                  <Progress value={65} className='h-2 bg-muted dark:bg-slate-800' />
                </div>
              </CardContent>
            </Card>

            <Card className='shadow-sm dark:border-slate-800 dark:bg-slate-950/50'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base dark:text-slate-100'>
                  Activity log
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-3'>
                  <div className='relative flex flex-col items-center'>
                    <div className='bg-emerald-100 dark:bg-emerald-950/60 p-1.5 rounded-full'>
                      <ArrowUpRight className='h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400' />
                    </div>
                    <div className='w-px h-full bg-border dark:bg-slate-800 mt-1'></div>
                  </div>
                  <div className='pb-4'>
                    <p className='text-xs dark:text-slate-200'>Deployment success</p>
                    <p className='text-[11px] text-muted-foreground dark:text-slate-400'>
                      Version 2.4.0 deployed to production.
                    </p>
                    <p className='text-[10px] text-muted-foreground/60 dark:text-slate-500 mt-1'>
                      2 mins ago
                    </p>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <div className='relative flex flex-col items-center'>
                    <div className='bg-blue-100 dark:bg-blue-950/60 p-1.5 rounded-full'>
                      <UserPlus className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
                    </div>
                    <div className='w-px h-full bg-border dark:bg-slate-800 mt-1'></div>
                  </div>
                  <div className='pb-4'>
                    <p className='text-xs dark:text-slate-200'>New user joined</p>
                    <p className='text-[11px] text-muted-foreground dark:text-slate-400'>
                      Raymond Reddington created an account.
                    </p>
                    <p className='text-[10px] text-muted-foreground/60 dark:text-slate-500 mt-1'>
                      45 mins ago
                    </p>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <div className='relative flex flex-col items-center'>
                    <div className='bg-amber-100 dark:bg-amber-950/60 p-1.5 rounded-full'>
                      <Activity className='h-3.5 w-3.5 text-amber-600 dark:text-amber-400' />
                    </div>
                  </div>
                  <div>
                    <p className='text-xs dark:text-slate-200'>Performance report</p>
                    <p className='text-[11px] text-muted-foreground dark:text-slate-400'>
                      Weekly performance stats are ready.
                    </p>
                    <p className='text-[10px] text-muted-foreground/60 dark:text-slate-500 mt-1'>
                      2 hours ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </TabsContent>
  );
};
