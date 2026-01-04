'use client';

import { ColumnDef, FilterFn, SortDirection } from '@tanstack/react-table';
import { toast } from 'sonner';
import { ArrowUpDown, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Payment } from '@/data/payments';

const myCustomFilterFn: FilterFn<Payment> = (row, _columnId, filterValue: string) => {
  const searchTerms = filterValue.toLowerCase().split(' ');
  const { clientName, email, status } = row.original;
  const searchableRowContent = `${clientName} ${email} ${status}`.toLowerCase();

  return searchTerms.every((term: string) => searchableRowContent.includes(term));
};

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (!isSorted) return <ArrowUpDown className='h-3.5 w-3.5 opacity-50' />;

  return isSorted === 'asc' ? (
    <ChevronUp className='h-4 w-4 text-primary dark:text-blue-400' />
  ) : (
    <ChevronDown className='h-4 w-4 text-primary dark:text-blue-400' />
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => (
      <Button
        variant='ghost'
        size='sm'
        className='-ml-3 h-8 dark:hover:bg-slate-800'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Client Name
        <SortedIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='font-medium text-foreground dark:text-slate-100'>
        {row.getValue('clientName')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div>
        <Button
          variant='ghost'
          size='sm'
          className='-ml-2 h-8 dark:hover:bg-slate-800'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as Payment['status'];
      const statusStyles: Record<Payment['status'], string> = {
        pending:
          'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/30',
        processing:
          'bg-slate-50 text-slate-700 ring-slate-600/20 dark:bg-slate-800/50 dark:text-slate-300 dark:ring-slate-700',
        success:
          'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-500/30',
        failed:
          'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30',
      };

      return (
        <span
          className={cn(
            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize transition-colors',
            statusStyles[status] ||
              'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300'
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <div>
        <Button
          variant='ghost'
          size='sm'
          className='-ml-3 h-8 dark:hover:bg-slate-800'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='font-medium dark:text-slate-200'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'email',
    filterFn: myCustomFilterFn,
    header: ({ column }) => (
      <div>
        <Button
          variant='ghost'
          size='sm'
          className='-ml-3 h-8 dark:hover:bg-slate-800'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground dark:text-slate-400 text-sm'>
        {row.getValue('email')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className='text-center dark:text-slate-400'>Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='h-8 w-8 p-0 border dark:border-slate-800 hover:bg-muted dark:hover:bg-slate-800'
              >
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-40 dark:bg-slate-950 dark:border-slate-800'
            >
              <DropdownMenuLabel className='dark:text-slate-300'>
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                className='dark:focus:bg-slate-800'
                onClick={() => {
                  navigator.clipboard.writeText(payment.id);
                  toast.success('Payment ID copied');
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator className='dark:bg-slate-800' />
              <DropdownMenuItem className='dark:focus:bg-slate-800'>
                View customer
              </DropdownMenuItem>
              <DropdownMenuItem className='dark:focus:bg-slate-800'>
                View details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
