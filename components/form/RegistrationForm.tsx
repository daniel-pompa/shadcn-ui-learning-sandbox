'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isValid as isValidDate, parse } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { formSchema, type RegistrationFormValues } from '@/lib/schemas/form-schema';

export function RegistrationForm() {
  const [dateInput, setDateInput] = useState('');

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Validate on every keystroke/change
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      bio: '',
      terms: false,
      gender: '' as RegistrationFormValues['gender'],
      role: '' as RegistrationFormValues['role'],
      dateOfBirth: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  /** Syncs calendar selection and forces full form re-validation */
  const handleDateSelect = async (date: Date | undefined) => {
    if (date) {
      // Set the date and mark as touched/dirty so Zod picks it up
      form.setValue('dateOfBirth', date, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setDateInput(format(date, 'MM/dd/yyyy'));

      await form.trigger();
    }
  };

  async function onSubmit(data: RegistrationFormValues) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log({ data });
      toast.success('Account created successfully');
      form.reset();
      setDateInput('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error('Something went wrong');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 border p-8 rounded-xl bg-card shadow-sm'
      >
        <div className='grid md:grid-cols-2 gap-6 items-start'>
          {/* Username */}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='john@company.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='••••••••' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (optional)</FormLabel>
                <FormControl>
                  <Input placeholder='648 117 838' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='developer'>Developer</SelectItem>
                    <SelectItem value='designer'>Designer</SelectItem>
                    <SelectItem value='manager'>Manager</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of birth */}
          <FormField
            control={form.control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <div className='relative w-full'>
                    <FormControl>
                      <Input
                        placeholder='MM/DD/YYYY'
                        value={dateInput}
                        onChange={async e => {
                          const val = e.target.value;
                          setDateInput(val);

                          if (val.length === 10) {
                            const parsedDate = parse(val, 'MM/dd/yyyy', new Date());
                            if (isValidDate(parsedDate)) {
                              field.onChange(parsedDate);
                            }
                          } else {
                            // If input is partial or invalid, clear field value
                            field.onChange(undefined);
                          }

                          // Triggers validation for the whole schema to catch the global refine
                          await form.trigger();
                        }}
                      />
                    </FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent'
                      >
                        <CalendarIcon className='h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent
                    align='end'
                    side='bottom'
                    className='w-auto p-0'
                    sideOffset={8}
                  >
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={handleDateSelect}
                      disabled={date =>
                        date > new Date() || date < new Date('1920-01-01')
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value || ''}
                    className='flex h-10 items-center space-x-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='male' id='male' />
                      <FormLabel htmlFor='male' className='font-normal cursor-pointer'>
                        Male
                      </FormLabel>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='female' id='female' />
                      <FormLabel htmlFor='female' className='font-normal cursor-pointer'>
                        Female
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bio */}
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Briefly describe your professional background...'
                  className='min-h-25 resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 160 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms */}
        <FormField
          control={form.control}
          name='terms'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Terms of service</FormLabel>
                <FormDescription>I agree to the privacy policy.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type='submit'
          className='w-full md:w-max px-12'
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
          {isSubmitting ? 'Processing...' : 'Create account'}
        </Button>
      </form>
    </Form>
  );
}
