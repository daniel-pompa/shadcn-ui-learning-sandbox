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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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
      <div className='flex items-center justify-between px-2 py-4 border-t'>
        {/* Selection stats */}
        <div className='flex-1 text-sm text-muted-foreground'>
          <span className='font-medium text-foreground'>
            {table.getFilteredSelectedRowModel().rows.length}
          </span>{' '}
          of{' '}
          <span className='font-medium'>{table.getFilteredRowModel().rows.length}</span>{' '}
          row(s) selected.
        </div>

        <div className='flex items-center space-x-6 lg:space-x-8'>
          {/* Rows per page selector */}
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={value => table.setPageSize(Number(value))}
            >
              <SelectTrigger className='h-8 w-20 bg-background'>
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent position='popper' sideOffset={4}>
                {[10, 20, 30, 40, 50, 100].map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page navigation */}
          <div className='flex items-center space-x-2'>
            <div className='flex w-25 items-center justify-center text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>

            <div className='flex items-center space-x-1'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <ChevronsLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRight className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <ChevronsRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
