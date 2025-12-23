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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { KeyRound, RotateCcw } from 'lucide-react';

interface TabFormsProps {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  progress: number;
  setProgress: (value: number) => void;
}

export const TabForms = ({
  notifications,
  setNotifications,
  progress,
  setProgress,
}: TabFormsProps) => {
  const [passwords, setPasswords] = useState({ current: '', next: '' });

  // Handlers
  const handleNotificationChange = (checked: boolean) => {
    setNotifications(checked);
    toast.success(checked ? 'Notifications enabled' : 'Notifications disabled', {
      description: checked
        ? 'You will now receive daily email summaries.'
        : 'Daily email summaries have been paused.',
    });
  };

  const handleProgressUpdate = (value: number) => {
    setProgress(value);
    if (value === 100) {
      toast.success('Profile completed!', {
        description: 'Your workspace is now fully configured.',
      });
    } else {
      toast.info(`Progress updated to ${value}%`);
    }
  };

  const handleSendMessage = () => {
    toast.promise(new Promise(res => setTimeout(res, 1500)), {
      loading: 'Sending your message...',
      success: 'Message sent successfully to support.',
      error: 'Failed to send message.',
    });
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.next) {
      toast.error('Please fill in both password fields');
      return;
    }
    toast.success('Password updated successfully', {
      description: 'Your security credentials have been refreshed.',
    });
    setPasswords({ current: '', next: '' });
  };

  const handleResetForm = () => {
    setPasswords({ current: '', next: '' });
    toast.info('Form cleared', {
      description: 'The password fields have been reset.',
    });
  };

  return (
    <TabsContent value='forms' className='space-y-6 animate-in fade-in-50 duration-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Global settings */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 pt-6'>
            <CardTitle className='text-base font-bold'>Global settings</CardTitle>
            <CardDescription>Configure your workspace behavior</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-6'>
            <div className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors'>
              <div className='space-y-0.5'>
                <Label className='text-sm font-bold'>Notifications</Label>
                <p className='text-[11px] text-muted-foreground'>
                  Receive daily email summaries
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={handleNotificationChange}
              />
            </div>
            <div className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors'>
              <div className='space-y-0.5'>
                <Label className='text-sm font-bold'>Auto-save</Label>
                <p className='text-[11px] text-muted-foreground'>
                  Save changes every 5 minutes
                </p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={c =>
                  toast(c ? 'Auto-save enabled' : 'Auto-save disabled')
                }
              />
            </div>
            <div className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors'>
              <div className='space-y-0.5'>
                <Label className='text-sm font-bold'>Analytics</Label>
                <p className='text-[11px] text-muted-foreground'>
                  Share anonymous usage data
                </p>
              </div>
              <Switch
                onCheckedChange={c =>
                  toast.info(c ? 'Analytics enabled' : 'Analytics disabled')
                }
              />
            </div>
            <div className='space-y-3 pt-2'>
              <div className='flex justify-between text-xs font-bold'>
                <Label className='text-xs'>Profile completion</Label>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className='h-2 bg-muted' />
              <div className='flex justify-between gap-2'>
                {[25, 50, 75, 100].map(v => (
                  <Button
                    key={v}
                    variant='outline'
                    size='sm'
                    className='flex-1 h-8 text-[10px] font-bold'
                    onClick={() => handleProgressUpdate(v)}
                  >
                    {v}%
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct message */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 pt-6'>
            <CardTitle className='text-base font-bold'>Direct message</CardTitle>
            <CardDescription>Send a message to the support team</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-xs font-bold'>
                Subject
              </Label>
              <Input
                id='name'
                placeholder='What can we help you with?'
                className='text-sm'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category' className='text-xs font-bold'>
                Inquiry type
              </Label>
              <Select>
                <SelectTrigger className='text-sm'>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='tech'>Technical support</SelectItem>
                  <SelectItem value='bill'>Billing & pricing</SelectItem>
                  <SelectItem value='feat'>Feature request</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='msg' className='text-xs font-bold'>
                Message body
              </Label>
              <Textarea
                id='msg'
                placeholder='Describe your issue...'
                className='min-h-32 resize-none text-sm'
              />
            </div>
            <div className='flex items-center space-x-2 pt-2'>
              <Checkbox
                id='urgent'
                onCheckedChange={c => c && toast.warning('Priority set to urgent')}
              />
              <Label htmlFor='urgent' className='text-xs font-medium cursor-pointer'>
                Mark as urgent priority
              </Label>
            </div>
          </CardContent>
          <CardFooter className='p-6 pt-0'>
            <Button className='w-full font-bold h-10' onClick={handleSendMessage}>
              Send message
            </Button>
          </CardFooter>
        </Card>

        {/* Security and access */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 pt-6'>
            <CardTitle className='text-base font-bold'>Security and access</CardTitle>
            <CardDescription>Manage your account credentials</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='curr-pass' className='text-xs font-bold'>
                  Current password
                </Label>
                <Input
                  id='curr-pass'
                  type='password'
                  value={passwords.current}
                  onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='new-pass' className='text-xs font-bold'>
                  New password
                </Label>
                <Input
                  id='new-pass'
                  type='password'
                  value={passwords.next}
                  onChange={e => setPasswords({ ...passwords, next: e.target.value })}
                />
              </div>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  className='flex-1 text-[11px] font-bold gap-2'
                  onClick={handleResetForm}
                >
                  <RotateCcw className='h-3 w-3' />
                  Reset
                </Button>
                <Button
                  className='flex-1 text-[11px] font-bold gap-2'
                  onClick={handlePasswordUpdate}
                >
                  <KeyRound className='h-3 w-3' />
                  Update password
                </Button>
              </div>
            </div>

            <Separator />

            <div className='space-y-3'>
              <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                Two-factor authentication
              </Label>
              <RadioGroup
                defaultValue='email'
                className='grid grid-cols-1 md:grid-cols-2 gap-2'
              >
                {[
                  { id: 'r1', value: 'email', label: 'Email verification' },
                  { id: 'r3', value: 'app', label: 'Authenticator app' },
                  { id: 'r4', value: 'passkey', label: 'Passkey' },
                  { id: 'r2', value: 'sms', label: 'Sms text message' },
                ].map(option => (
                  <div
                    key={option.id}
                    className='flex items-center space-x-2 border p-2.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors'
                  >
                    <RadioGroupItem value={option.value} id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className='flex-1 cursor-pointer text-xs font-medium'
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className='flex items-center justify-between pt-4 border-t'>
              <div className='space-y-0.5'>
                <Label className='text-sm font-bold text-destructive'>Danger zone</Label>
                <p className='text-[10px] text-muted-foreground'>
                  Log out from all active devices
                </p>
              </div>
              <Button
                variant='destructive'
                size='sm'
                className='font-bold'
                onClick={() => toast.error('Sessions terminated')}
              >
                Terminate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};
