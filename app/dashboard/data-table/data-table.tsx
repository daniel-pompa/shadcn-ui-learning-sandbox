'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
}: DataTableProps<TData, TValue>) {
  // Local state to manage data changes like deletions within the component lifecycle
  const [tableData, setTableData] = useState<TData[]>(initialData);

  // Table state management for core features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentStatus, setCurrentStatus] = useState('all');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Derived state to check if any row is currently selected
  const isAnyRowSelected = Object.keys(rowSelection).length > 0;

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /** Filters out selected rows from the local state and resets the selection. */
  const handleDeleteSelected = () => {
    const selectedRowIds = table.getSelectedRowModel().rows.map(row => row.id);

    const filteredData = tableData.filter((_, index) => {
      // By default, TanStack Table uses row index as the ID string
      return !selectedRowIds.includes(index.toString());
    });

    setTableData(filteredData);
    setRowSelection({});
  };

  return (
    <div className='w-full space-y-4'>
      {/* Toolbar: search, filters and actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center flex-1'>
          {/* Email search filter */}
          <Input
            placeholder='Filter by client name, email, status...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={event => {
              setCurrentStatus('all');
              table.getColumn('status')?.setFilterValue(undefined);
              table.getColumn('email')?.setFilterValue(event.target.value);
            }}
            className='max-w-sm'
          />

          {/* Status dropdown filter */}
          <Select
            value={currentStatus}
            onValueChange={value => {
              if (value === 'all') {
                table.getColumn('status')?.setFilterValue(undefined);
                setCurrentStatus('all');
                return;
              }
              setCurrentStatus(value);
              table.getColumn('status')?.setFilterValue(value);
            }}
          >
            <SelectTrigger className='w-45 mx-2'>
              <SelectValue placeholder='Select a status' />
            </SelectTrigger>
            {/* position='popper' ensures the content stays relative to the trigger */}
            <SelectContent position='popper' sideOffset={4}>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='processing'>Processing</SelectItem>
                <SelectItem value='success'>Success</SelectItem>
                <SelectItem value='failed'>Failed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Delete action (visible only when rows are selected) */}
          {isAnyRowSelected && (
            <Button
              variant='destructive'
              onClick={handleDeleteSelected}
              className='animate-in fade-in zoom-in duration-200'
            >
              Delete selected ({table.getSelectedRowModel().rows.length})
            </Button>
          )}
        </div>

        {/* Column visibility toggle dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .filter(column => column.id !== 'actions')
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Data Table content */}
      <div className='rounded-xl border shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className='h-12 px-4 text-muted-foreground font-semibold'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group hover:bg-muted/30 transition-colors'
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='px-4 py-3'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              /* Empty state message */
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-32 text-center text-muted-foreground'
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination and stats */}
      <div className='flex items-center justify-between px-2'>
        <div className='text-muted-foreground flex-1 text-sm font-medium'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='flex items-center space-x-2'>
          <div className='text-sm text-muted-foreground font-medium'>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 font-semibold'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 font-semibold'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
