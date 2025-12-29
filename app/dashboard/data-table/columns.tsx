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

/**
 * Custom filter function for multi-column searching.
 * @param row - The current row being filtered, provides access to the original data object.
 * @param _columnId - The ID of the column being filtered (unused but required for positional signature).
 * @param filterValue - The search string provided by the user from the UI input.
 * @returns boolean - True if the row matches all parts of the search terms.
 */
const myCustomFilterFn: FilterFn<Payment> = (
  row,
  _columnId,
  filterValue: string
) => {
  // Normalize the search input and split it into individual terms (words)
  // This allows for multi-word searching regardless of order (e.g., "success john")
  const searchTerms = filterValue.toLowerCase().split(' ');

  // Aggregate the searchable row values into a single string for comparison
  // We include clientName, email, and status to make them all searchable at once
  const { clientName, email, status } = row.original;
  const searchableRowContent = `${clientName} ${email} ${status}`.toLowerCase();

  // Ensure EVERY search term is present in the aggregated row content
  // This implements an "AND" logic filter (all words must match)
  return searchTerms.every((term: string) => searchableRowContent.includes(term));
};

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (!isSorted) return <ArrowUpDown className='h-3.5 w-3.5 opacity-50' />;

  return isSorted === 'asc' ? (
    <ChevronUp className='h-4 w-4 text-primary' />
  ) : (
    <ChevronDown className='h-4 w-4 text-primary' />
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
        className='-ml-3 h-8'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Client Name
        <SortedIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='font-medium text-foreground'>{row.getValue('clientName')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div>
        <Button
          variant='ghost'
          size='sm'
          className='-ml-2 h-8'
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
        pending: 'bg-blue-50 text-blue-700 ring-blue-600/20',
        processing: 'bg-slate-50 text-slate-700 ring-slate-600/20',
        success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        failed: 'bg-red-50 text-red-700 ring-red-600/20',
      };

      return (
        <span
          className={cn(
            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize',
            statusStyles[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20'
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
          className='-ml-3 h-8'
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

      return <div className='font-medium'>{formatted}</div>;
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
          className='-ml-3 h-8'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>{row.getValue('email')}</div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0 border hover:bg-muted'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(payment.id);
                  toast.success('Payment ID copied');
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
