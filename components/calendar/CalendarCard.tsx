import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { CalendarState } from '@/types/calendar';
import { formatDate, getDateDetails } from '@/lib/date-utils';

interface CalendarCardProps {
  calendar: CalendarState;
  onDateSelect: (date: Date | undefined) => void;
}

export const CalendarCard = ({ calendar, onDateSelect }: CalendarCardProps) => {
  const date = calendar.date as Date | undefined;
  const { dayOfWeek, isoFormat } = getDateDetails(date);

  return (
    <Card
      key={calendar.id}
      className='overflow-hidden shadow-sm pt-0 dark:bg-slate-950 dark:border-slate-800'
    >
      <CardHeader className='bg-gray-100/50 dark:bg-slate-900/50 py-4 border-b dark:border-slate-800'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold flex items-center gap-2 dark:text-slate-100'>
            <CalendarIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            {calendar.title}
          </CardTitle>
          <Badge
            variant={date ? 'default' : 'outline'}
            className={
              date
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40'
                : 'dark:text-gray-400 dark:border-slate-700'
            }
          >
            {date ? 'Selected' : 'Pending'}
          </Badge>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          {calendar.description}
        </p>
      </CardHeader>

      <CardContent className='space-y-4 pt-4'>
        {/* Calendar component */}
        <div className='flex justify-center'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={onDateSelect}
            disabled={calendar.disabledCondition}
            className='rounded-md border dark:border-slate-800'
            autoFocus
          />
        </div>

        {/* Selected date display */}
        <div className='pt-4 border-t dark:border-slate-800'>
          <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2'>
            <CalendarIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            <span className='font-medium'>Selected date</span>
          </div>
          <div
            className={`p-3 rounded-lg border transition-colors ${
              date
                ? 'bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50'
                : 'bg-gray-50 border-gray-200 dark:bg-slate-900 dark:border-slate-800'
            }`}
          >
            <p
              className={`font-medium ${
                date
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-500'
              }`}
            >
              {formatDate(date)}
            </p>

            {/* Additional date information when selected */}
            {date && (
              <div className='mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400'>
                <div className='flex gap-2'>
                  <span>Day of week:</span>
                  <span className='font-medium dark:text-gray-300'>{dayOfWeek}</span>
                </div>
                <div className='flex gap-2'>
                  <span>ISO format:</span>
                  <span className='font-mono dark:text-gray-300'>{isoFormat}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
