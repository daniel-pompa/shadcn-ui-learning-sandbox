'use client';

import * as React from 'react';
import { toast } from 'sonner';
import {
  User,
  Lock,
  Save,
  ShieldCheck,
  Fingerprint,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabsDemo() {
  const [loading, setLoading] = React.useState(false);

  // State management
  const [accountData, setAccountData] = React.useState({
    name: 'John Doe',
    username: '@johndoe',
  });

  const [passwordData, setPasswordData] = React.useState({
    current: '',
    new: '',
  });

  // Validation
  const isAccountInvalid =
    !accountData.name.trim() ||
    !accountData.username.trim() ||
    accountData.username.length < 3;

  const isPasswordInvalid =
    passwordData.current.length === 0 || passwordData.new.length < 6;

  // Handlers
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const field = id.replace('tabs-demo-', '');
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const field = id.replace('tabs-demo-', '');
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const onSave = async (type: 'account' | 'password') => {
    setLoading(true);

    // Simulated API mock
    const simulateApi = () =>
      new Promise(resolve => setTimeout(() => resolve({ success: true }), 2000));

    toast.promise(simulateApi(), {
      loading: `Updating ${type}...`,
      success: () => {
        setLoading(false);
        if (type === 'password') setPasswordData({ current: '', new: '' });
        return `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`;
      },
      error: () => {
        setLoading(false);
        return 'Failed to save changes';
      },
    });
  };

  return (
    <div className='flex w-full max-w-sm flex-col gap-6'>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account' className='gap-2' disabled={loading}>
            <User className='h-3.5 w-3.5' />
            Account
          </TabsTrigger>
          <TabsTrigger value='password' className='gap-2' disabled={loading}>
            <Lock className='h-3.5 w-3.5' />
            Password
          </TabsTrigger>
        </TabsList>

        {/* Account */}
        <TabsContent
          value='account'
          className='animate-in fade-in-50 zoom-in-95 duration-300'
        >
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2 mb-1 text-primary'>
                <Fingerprint className='h-4 w-4' />
                <CardTitle className='text-base font-medium'>Account</CardTitle>
              </div>
              <CardDescription>
                Update your profile information and public username.
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='tabs-demo-name'>Name</Label>
                <Input
                  id='tabs-demo-name'
                  value={accountData.name}
                  onChange={handleAccountChange}
                  disabled={loading}
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='tabs-demo-username'>Username</Label>
                <Input
                  id='tabs-demo-username'
                  value={accountData.username}
                  onChange={handleAccountChange}
                  disabled={loading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className='w-full gap-2'
                onClick={() => onSave('account')}
                disabled={loading || isAccountInvalid}
              >
                {loading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Save className='h-4 w-4' />
                )}
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password */}
        <TabsContent
          value='password'
          className='animate-in fade-in-50 zoom-in-95 duration-300'
        >
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2 mb-1 text-primary'>
                <ShieldCheck className='h-4 w-4' />
                <CardTitle className='text-base font-medium'>Password</CardTitle>
              </div>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='tabs-demo-current'>Current password</Label>
                <Input
                  id='tabs-demo-current'
                  type='password'
                  placeholder='Enter current password'
                  value={passwordData.current}
                  onChange={handlePasswordChange}
                  disabled={loading}
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='tabs-demo-new'>New password</Label>
                <Input
                  id='tabs-demo-new'
                  type='password'
                  placeholder='Min. 6 characters'
                  value={passwordData.new}
                  onChange={handlePasswordChange}
                  disabled={loading}
                />
                {passwordData.new.length > 0 && passwordData.new.length < 6 && (
                  <p className='text-[0.7rem] text-destructive flex items-center gap-1'>
                    <AlertCircle className='h-3 w-3' />
                    Password is too short
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className='w-full gap-2'
                onClick={() => onSave('password')}
                disabled={loading || isPasswordInvalid}
              >
                {loading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Lock className='h-4 w-4' />
                )}
                Update password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
