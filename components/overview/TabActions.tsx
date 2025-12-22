'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Eye, Trash2, ChevronsUpDown } from 'lucide-react';

export const TabActions = () => {
  return (
    <TabsContent value='actions' className='space-y-6 animate-in fade-in-50 duration-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Buttons Style */}
        <Card className='border'>
          <CardHeader>
            <CardTitle>Button styles</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-4'>
            <Button>Primary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='destructive'>Delete</Button>
          </CardContent>
        </Card>

        {/* Modal overlays */}
        <Card className='border'>
          <CardHeader>
            <CardTitle>Modal overlays</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline' className='w-full'>
                  <Eye className='mr-2 h-4 w-4' /> Preview Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Logs</DialogTitle>
                  <DialogDescription>Review system logs.</DialogDescription>
                </DialogHeader>
                <div className='bg-muted p-4 rounded text-xs font-mono'>
                  [INFO] Cache cleared...
                </div>
                <DialogFooter>
                  <Button>Refresh</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className='w-full'>
                  <Trash2 className='mr-2 h-4 w-4' /> Delete Workspace
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action is permanent.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className='bg-destructive'>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Navigation dropdowns */}
        <Card className='border shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <Label className='text-[10px] uppercase text-muted-foreground font-bold'>
              Node Selection
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary' className='w-full justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <div className='h-6 w-6 rounded bg-primary text-[10px] flex items-center justify-center text-white'>
                      NX
                    </div>
                    <span className='text-sm font-bold'>Nexus Prod</span>
                  </div>
                  <ChevronsUpDown className='h-3 w-3 opacity-50' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-64'>
                <DropdownMenuLabel>Clusters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Nexus Staging</DropdownMenuItem>
                <DropdownMenuItem>Nexus Production</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};
