'use client';

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

// Define the props interface to match your original state logic
interface TabFormsProps {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  progress: number;
  setProgress: (value: number) => void;
}

export function TabForms({
  notifications,
  setNotifications,
  progress,
  setProgress,
}: TabFormsProps) {
  return (
    <TabsContent value='forms' className='space-y-6 animate-in fade-in-50 duration-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Global settings */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 pt-6'>
            <CardTitle>Global settings</CardTitle>
            <CardDescription>Configure your workspace behavior</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-6'>
            <div className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Notifications</Label>
                <p className='text-xs text-muted-foreground'>
                  Receive daily email summaries
                </p>
              </div>
              {/* Maintain your exact state logic here */}
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Auto-save</Label>
                <p className='text-xs text-muted-foreground'>
                  Save changes every 5 minutes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Analytics</Label>
                <p className='text-xs text-muted-foreground'>
                  Share anonymous usage data
                </p>
              </div>
              <Switch />
            </div>
            <div className='space-y-3 pt-2'>
              <div className='flex justify-between text-sm font-medium'>
                <Label>Profile completion</Label>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className='h-2 bg-muted' />
              <div className='flex justify-between gap-2'>
                {[25, 50, 75, 100].map(v => (
                  <Button
                    key={v}
                    variant='outline'
                    size='sm'
                    className='flex-1 h-8 text-xs'
                    onClick={() => setProgress(v)}
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
            <CardTitle>Direct message</CardTitle>
            <CardDescription>Send a message to the support team</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Subject</Label>
              <Input id='name' placeholder='What can we help you with?' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Inquiry type</Label>
              <Select>
                <SelectTrigger>
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
              <Label htmlFor='msg'>Message body</Label>
              <Textarea
                id='msg'
                placeholder='Describe your issue...'
                className='min-h-30 resize-none'
              />
            </div>
            <div className='flex items-center space-x-2 pt-2'>
              <Checkbox id='urgent' />
              <Label htmlFor='urgent' className='text-sm font-medium'>
                Mark as urgent priority
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>Send message</Button>
          </CardFooter>
        </Card>

        {/* Security and access */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 pt-6'>
            <CardTitle>Security and access</CardTitle>
            <CardDescription>Manage your account credentials</CardDescription>
          </CardHeader>
          <CardContent className='p-6 space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='curr-pass'>Current password</Label>
                <Input id='curr-pass' type='password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='new-pass'>New password</Label>
                <Input id='new-pass' type='password' />
              </div>
            </div>

            <Separator />

            <div className='space-y-3'>
              <Label>Two-factor authentication</Label>
              <RadioGroup defaultValue='email' className='grid md:grid-cols-2 gap-3'>
                <div className='flex items-center space-x-2 border p-2 rounded-md hover:bg-muted/50 cursor-pointer'>
                  <RadioGroupItem value='email' id='r1' />
                  <Label htmlFor='r1' className='flex-1 cursor-pointer text-xs'>
                    Email verification
                  </Label>
                </div>
                <div className='flex items-center space-x-2 border p-2 rounded-md hover:bg-muted/50 cursor-pointer'>
                  <RadioGroupItem value='app' id='r3' />
                  <Label htmlFor='r3' className='flex-1 cursor-pointer text-xs'>
                    Authenticator app
                  </Label>
                </div>
                <div className='flex items-center space-x-2 border p-2 rounded-md hover:bg-muted/50 cursor-pointer'>
                  <RadioGroupItem value='passkey' id='r4' />
                  <Label htmlFor='r4' className='flex-1 cursor-pointer text-xs'>
                    Passkey
                  </Label>
                </div>
                <div className='flex items-center space-x-2 border p-2 rounded-md hover:bg-muted/50 cursor-pointer'>
                  <RadioGroupItem value='sms' id='r2' />
                  <Label htmlFor='r2' className='flex-1 cursor-pointer text-xs'>
                    SMS text message
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className='flex items-center justify-between pt-2'>
              <div className='space-y-1'>
                <Label className='text-sm font-bold text-destructive'>Danger zone</Label>
                <p className='text-xs text-muted-foreground'>
                  Log out from all active devices
                </p>
              </div>
              <Button variant='destructive' size='sm'>
                Terminate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
