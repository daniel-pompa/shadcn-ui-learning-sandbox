'use client';

import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Payment } from '@/data/payments';

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'clientName',
    header: 'Client Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Payment['status'];
      const statusStyles: Record<Payment['status'], string> = {
        pending: 'bg-blue-100 text-blue-700 border-blue-200',
        processing: 'bg-slate-100 text-slate-700 border-slate-200',
        success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        failed: 'bg-red-100 text-red-700 border-red-200',
      };

      return (
        <span
          className={`
            inline-flex items-center rounded-full border px-2.5 py-0.5 
            text-xs font-semibold transition-colors capitalize
            ${statusStyles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}
          `}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.id);
                toast.info('Payment ID copied to clipboard.');
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
