'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Copy } from 'lucide-react';

export default function DialogCloseButton() {
  // State for copy functionality
  const [copied, setCopied] = useState(false);

  // State for edit profile dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form state (initially empty)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
  });

  const link = 'https://ui.shadcn.com/docs/installation';

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log form data to console
    console.log('Full form data:', formData);

    // Close dialog automatically
    setIsEditDialogOpen(false);
  };

  // Handle dialog open/close
  const handleEditDialogOpen = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      // Reset form when dialog is closed without saving
      setFormData({ name: '', username: '' });
    }
  };

  return (
    <div className='flex gap-4'>
      {/* First dialog: Share with copy functionality */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className='w-32'>
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center gap-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Input id='link' defaultValue={link} readOnly className='pr-10' />
            </div>
            <Button
              size='icon'
              variant='outline'
              onClick={copyToClipboard}
              className='shrink-0'
            >
              {copied ? (
                <Check className='h-4 w-4 text-green-600' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
              <span className='sr-only'>Copy to clipboard</span>
            </Button>
          </div>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button variant='secondary'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second dialog: Edit Profile with auto-close on save */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='w-32'
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-112.5'>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='Enter your name'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='@username'
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
