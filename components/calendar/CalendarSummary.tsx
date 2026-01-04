import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { CalendarState, RestrictionType } from '@/types/calendar';
import { formatDate, formatMultipleDates, getMultiDateDetails } from '@/lib/date-utils';
import { getCalendarRestrictionDetails } from '@/constants/calendar';
import { cn } from '@/lib/utils';

interface CalendarSummaryProps {
  calendars: CalendarState[];
  onClearAll: () => void;
  hasSelectedDates: boolean;
  multipleCalendarRestriction: RestrictionType;
}

export const CalendarSummary = ({
  calendars,
  onClearAll,
  hasSelectedDates,
  multipleCalendarRestriction,
}: CalendarSummaryProps) => {
  return (
    <Card className='dark:bg-slate-950 dark:border-slate-800'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 dark:text-slate-100'>
          <CalendarIcon className='h-5 w-5 text-blue-600 dark:text-blue-400' />
          Calendar selection summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {calendars.map(calendar => (
            <CalendarSummaryItem
              key={calendar.id}
              calendar={calendar}
              multipleCalendarRestriction={
                calendar.id === 'multiple' ? multipleCalendarRestriction : undefined
              }
            />
          ))}
        </div>

        {/* Clear all button */}
        <div className='mt-8 pt-6 border-t dark:border-slate-800 flex justify-center'>
          <button
            onClick={onClearAll}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              hasSelectedDates
                ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                : 'text-gray-400 bg-gray-50 cursor-not-allowed dark:bg-slate-900 dark:text-slate-600'
            )}
            disabled={!hasSelectedDates}
          >
            Clear All Selections
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// Subcomponent for individual calendar summary
function CalendarSummaryItem({
  calendar,
  multipleCalendarRestriction,
}: {
  calendar: CalendarState;
  multipleCalendarRestriction?: RestrictionType;
}) {
  let dateDisplay = '';
  let dateCount = 0;

  if (calendar.mode === 'multiple') {
    const dates = calendar.date as Date[] | undefined;
    const details = getMultiDateDetails(dates);
    dateDisplay = formatMultipleDates(dates || []);
    dateCount = details.count;
  } else {
    const date = calendar.date as Date | undefined;
    dateDisplay = formatDate(date);
    dateCount = date ? 1 : 0;
  }

  return (
    <div
      key={calendar.id}
      className='space-y-3 p-4 border rounded-lg dark:border-slate-800 dark:bg-slate-900/30'
    >
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-sm dark:text-slate-200'>{calendar.title}</h3>
        <div className='flex items-center gap-2'>
          {dateCount > 0 && (
            <span className='text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 px-2 py-0.5 rounded shadow-sm'>
              {dateCount} {calendar.mode === 'multiple' ? 'dates' : 'date'}
            </span>
          )}
          <div
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-colors',
              dateCount > 0
                ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                : 'bg-gray-300 dark:bg-slate-700'
            )}
          />
        </div>
      </div>

      <div>
        <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
          Selected date{calendar.mode === 'multiple' ? 's' : ''}:
        </p>
        <p
          className={cn(
            'font-medium text-sm leading-snug',
            dateCount > 0
              ? 'text-gray-900 dark:text-slate-100'
              : 'text-gray-400 dark:text-slate-600'
          )}
        >
          {dateDisplay}
        </p>
      </div>

      <div className='pt-2 border-t dark:border-slate-800'>
        <p className='text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter'>
          Mode and restrictions:
        </p>
        <ul className='text-xs text-gray-600 dark:text-gray-400 mt-1.5 space-y-1'>
          <li className='flex items-center gap-1.5'>
            <div
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                calendar.mode === 'multiple' ? 'bg-indigo-400' : 'bg-blue-400'
              )}
            />
            <span className='font-medium'>
              {calendar.mode === 'multiple' ? 'Multi-select' : 'Single-select'}
            </span>
          </li>
          {getCalendarRestrictionDetails(calendar.id, multipleCalendarRestriction).map(
            (restriction, index) => (
              <li key={index} className='flex items-center gap-1.5'>
                <div
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    restriction.type === 'disabled' ? 'bg-red-400' : 'bg-green-400'
                  )}
                />
                <span className='truncate'>{restriction.text}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
