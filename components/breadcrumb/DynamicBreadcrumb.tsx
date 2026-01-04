'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

/** Technical terms dictionary to ensure correct casing for acronyms. */
const SPECIAL_CASINGS: Record<string, string> = {
  otp: 'OTP',
  ui: 'UI',
  api: 'API',
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split('/').filter(Boolean);

  const showBackButton = segments.length > 1;

  /** Formats the URL segment into a readable label. */
  const getFormattedLabel = (segment: string): string => {
    return segment
      .split('-')
      .map(word => {
        const lowerWord = word.toLowerCase();
        if (SPECIAL_CASINGS[lowerWord]) {
          return SPECIAL_CASINGS[lowerWord];
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  return (
    <div className='flex items-center gap-4 mb-6'>
      {showBackButton && (
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 shrink-0 lg:hidden dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-400'
          onClick={() => router.back()}
        >
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Back</span>
        </Button>
      )}

      <Breadcrumb>
        <BreadcrumbList>
          {/* Default home root */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href='/dashboard/home'
                className='flex items-center text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors'
              >
                <Home className='h-4 w-4' />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            // Skip the 'dashboard' segment in the breadcrumb trail
            if (segment.toLowerCase() === 'dashboard') return null;

            const href = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1;
            const label = getFormattedLabel(segment);

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator>
                  <ChevronRight className='h-4 w-4 text-gray-400 dark:text-slate-600' />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className='font-semibold text-gray-900 dark:text-slate-100'>
                      {label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={href}
                        className='text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors'
                      >
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
