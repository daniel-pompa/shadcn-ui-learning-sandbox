'use client';

import { useState } from 'react';
import { Copy, Check, Info, AlertCircle } from 'lucide-react';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function InputOTPPage() {
  const [value, setValue] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const [demoCode, setDemoCode] = useState('891234');

  /** Logic to determine if the entered code is incorrect */
  const isInvalid = value.length === 6 && value !== demoCode;

  /** Generates a random 6-digit code and resets input */
  const generateRandomCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoCode(newCode);
    setValue('');
  };

  /** Handles copying the demo code to the clipboard */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(demoCode);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  /** * Triggers when all digits are filled.
   * Removes focus from the input for a cleaner UX.
   */
  const handleComplete = () => {
    if (typeof document !== 'undefined') {
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  return (
    <div className='max-w-md border rounded-xl space-y-8 p-2 sm:p-6 bg-white'>
      {/* Main OTP section */}
      <div className='flex flex-col items-center space-y-6 text-center'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>Verify your account</h1>
          <p className='text-xs text-slate-500'>
            We&#39;ve sent a 6-digit verification code to your registered email address.
          </p>
        </div>

        {/* Animation container if invalid */}
        <div
          className={isInvalid ? 'animate-bounce' : ''}
          style={{ animationIterationCount: 2, animationDuration: '0.3s' }}
        >
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={value}
            onChange={val => setValue(val)}
            onComplete={handleComplete}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className={isInvalid ? 'border-red-500 text-red-600' : ''}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Dynamic status message with validation logic */}
        <div className='h-5'>
          {value.length === 6 ? (
            <p
              className={`text-xs font-medium flex items-center gap-1 transition-all ${
                isInvalid ? 'text-red-600' : 'text-emerald-600'
              }`}
            >
              {isInvalid ? (
                <>
                  <AlertCircle className='h-4 w-4' /> Invalid verification code
                </>
              ) : (
                <>
                  <Check className='h-4 w-4' /> All digits entered correctly
                </>
              )}
            </p>
          ) : (
            <p className='text-xs text-slate-400 opacity-80'>
              Entered {value.length} of 6 digits
            </p>
          )}
        </div>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-slate-200' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-white px-2 text-slate-400 font-medium'>
            Developer Tools
          </span>
        </div>
      </div>

      {/* Utility section */}
      <div className='space-y-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Info className='h-4 w-4 text-blue-500' />
            <Label className='text-sm font-semibold text-slate-700'>
              Mock verification code
            </Label>
          </div>
        </div>

        <p className='text-xs text-slate-500 leading-relaxed'>
          Need a code to test the flow? Use the one below to bypass the actual SMTP/SMS
          service.
        </p>

        <div className='flex items-center gap-2'>
          <div className='relative flex-1'>
            <Input
              id='demo-code'
              value={demoCode}
              readOnly
              className='bg-white font-mono text-sm tracking-[0.3em] focus-visible:ring-0 border-slate-200 pr-10'
            />
          </div>

          <Button
            type='button'
            size='icon'
            variant='outline'
            className='h-9 w-9 shrink-0 transition-all'
            onClick={copyToClipboard}
          >
            <span className='sr-only'>Copy</span>
            {hasCopied ? (
              <Check className='h-4 w-4 text-emerald-600 animate-in fade-in zoom-in duration-300' />
            ) : (
              <Copy className='h-4 w-4 animate-in fade-in zoom-in duration-300' />
            )}
          </Button>
        </div>
      </div>

      <div className='text-center'>
        <Button
          variant='link'
          className='text-xs text-slate-500 hover:text-blue-600'
          onClick={generateRandomCode}
        >
          Didn&#39;t receive a code? Resend
        </Button>
      </div>
    </div>
  );
}
