'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Terminal,
  Layers,
  ChevronDown,
  Play,
  RotateCcw,
  Trash2,
  ShieldAlert,
  Download,
  ShieldCheck,
  Search,
  Server,
} from 'lucide-react';

export const TabActions = () => {
  // Toast handlers
  const handleCacheClear = () => toast.success('System cache cleared successfully');
  const handleLogsDownload = () => toast.info('Preparing logs for download');
  const handleDeploy = () =>
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Deploying update...',
      success: 'Production cluster updated',
      error: 'Deployment failed',
    });
  const handleForceStop = () => toast.error('Emergency stop sequence initiated');

  return (
    <TabsContent value='actions' className='space-y-6 animate-in fade-in-50 duration-500'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* System logs */}
        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Terminal className='h-5 w-5' /> System logs
            </CardTitle>
            <CardDescription>Real-time system activity and cache status</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='bg-zinc-950 p-4 rounded-lg text-[11px] font-mono leading-relaxed shadow-inner h-35 overflow-hidden'>
              <div className='text-emerald-500'>[SUCCESS] Build optimized in 1.2s</div>
              <div className='text-sky-400'>[INFO] Cache cleared successfully...</div>
              <div className='text-amber-400'>[WARN] High memory usage detected</div>
              <div className='text-zinc-500'>[DEBUG] Fetching user sessions...</div>
              <div className='text-emerald-500 animate-pulse'>
                [READY] Listening on port 3000
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' className='flex-1' onClick={handleCacheClear}>
                <RotateCcw className='h-3 w-3 mr-2' /> Clear cache
              </Button>
              <Button variant='outline' className='flex-1' onClick={handleLogsDownload}>
                <Download className='h-3 w-3 mr-2' /> Download logs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cluster management */}
        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Layers className='h-5 w-5' /> Cluster management
            </CardTitle>
            <CardDescription>Manage active deployments and nodes</CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            <div className='flex items-center justify-between p-3 border rounded-lg bg-muted/20'>
              <div className='space-y-1'>
                <p className='text-xs font-semibold'>Production cluster</p>
                <div className='flex items-center gap-2'>
                  <span className='flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse' />
                  <span className='text-[11px] text-muted-foreground font-medium'>
                    Us-east-1 (Nexus)
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-7 text-[11px]'>
                    Actions <ChevronDown className='ml-1 h-3 w-3' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end'>
                  <DropdownMenuLabel>Cluster options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast.info('Scaling nodes...')}>
                    Scale resources
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info('Viewing config...')}>
                    View configuration
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className='text-destructive'
                    onClick={() => toast.error('Maintenance mode required')}
                  >
                    Drain nodes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between text-[11px]'>
                <span className='text-muted-foreground font-medium'>Active nodes</span>
                <span className='font-bold'>12 / 12</span>
              </div>
              <div className='flex gap-1'>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className='h-3 flex-1 rounded-sm bg-emerald-500/70' />
                ))}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-2'>
              <Button onClick={handleDeploy}>
                <Play className='h-3 w-3' /> Deploy update
              </Button>
              <Button variant='destructive' onClick={handleForceStop}>
                <ShieldAlert className='h-3 w-3' /> Force stop
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security scan */}
        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <ShieldCheck className='h-5 w-5' /> Security scan
            </CardTitle>
            <CardDescription>Vulnerability and compliance tracking</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex flex-col items-center justify-center py-2 border-2 border-dashed rounded-lg bg-muted/10'>
              <div className='p-3 bg-blue-50 rounded-full mb-2'>
                <Search className='h-5 w-5 text-blue-600' />
              </div>
              <p className='text-xs font-medium'>No threats detected</p>
              <p className='text-[10px] text-muted-foreground'>
                Last scan performed 4 hours ago
              </p>
            </div>

            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Server className='h-4 w-4 text-muted-foreground' />
                  <span className='text-xs font-medium'>Compliance status</span>
                </div>
                <Badge
                  variant='outline'
                  className='text-[10px] border-emerald-500 text-emerald-600'
                >
                  Healthy
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <ShieldAlert className='h-4 w-4 text-muted-foreground' />
                  <span className='text-xs font-medium'>Open vulnerabilities</span>
                </div>
                <span className='text-xs font-bold'>0</span>
              </div>
            </div>

            <Button
              variant='outline'
              className='w-full'
              onClick={() =>
                toast.promise(new Promise(res => setTimeout(res, 1500)), {
                  loading: 'Scanning system...',
                  success: 'Security scan completed',
                  error: 'Scan failed to initialize',
                })
              }
            >
              Run security audit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resource usage row */}
      <Card className='shadow-sm overflow-hidden'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x border-t'>
          <div className='p-4 space-y-2'>
            <p className='text-[10px] uppercase font-bold text-muted-foreground tracking-wider'>
              Cpu usage
            </p>
            <p className='text-2xl font-bold'>24%</p>
            <div className='h-1.5 w-full bg-muted rounded-full overflow-hidden'>
              <div className='h-full bg-emerald-500 w-[24%]' />
            </div>
          </div>
          <div className='p-4 space-y-2'>
            <p className='text-[10px] uppercase font-bold text-muted-foreground tracking-wider'>
              Memory
            </p>
            <p className='text-2xl font-bold'>1.2gb</p>
            <div className='h-1.5 w-full bg-muted rounded-full overflow-hidden'>
              <div className='h-full bg-amber-500 w-[65%]' />
            </div>
          </div>
          <div className='p-4 space-y-2'>
            <p className='text-[10px] uppercase font-bold text-muted-foreground tracking-wider'>
              Api uptime
            </p>
            <p className='text-2xl font-bold'>99.9%</p>
            <p className='text-[10px] text-emerald-600 font-bold'>Online for 32 days</p>
          </div>
          <div className='p-4 flex items-center justify-center gap-2 bg-muted/20'>
            <Button
              variant='destructive'
              className='h-8 text-[12px]'
              onClick={() =>
                toast.warning('Are you sure? This action is irreversible', {
                  action: { label: 'Undo', onClick: () => console.log('Undo') },
                })
              }
            >
              <Trash2 className='h-3 w-3' /> Purge database
            </Button>
            <Button
              variant='default'
              className='h-8 text-[12px]'
              onClick={() => toast.info('Restarting node 01...')}
            >
              <RotateCcw className='h-3 w-3' /> Restart node
            </Button>
          </div>
        </div>
      </Card>
    </TabsContent>
  );
};
