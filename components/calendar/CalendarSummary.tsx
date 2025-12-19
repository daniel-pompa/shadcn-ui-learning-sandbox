import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { CalendarState, RestrictionType } from '@/types/calendar';
import { formatDate, formatMultipleDates, getMultiDateDetails } from '@/lib/date-utils';
import { getCalendarRestrictionDetails } from '@/constants/calendar';

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
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CalendarIcon className='h-5 w-5' />
          Calendar Selection Summary
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
        <div className='mt-8 pt-6 border-t flex justify-center'>
          <button
            onClick={onClearAll}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200'
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
    <div key={calendar.id} className='space-y-3 p-4 border rounded-lg'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>{calendar.title}</h3>
        <div className='flex items-center gap-2'>
          {dateCount > 0 && (
            <span className='text-xs font-medium bg-gray-100 px-2 py-1 rounded'>
              {dateCount} {calendar.mode === 'multiple' ? 'dates' : 'date'}
            </span>
          )}
          <div
            className={`h-3 w-3 rounded-full ${
              dateCount > 0 ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        </div>
      </div>

      <div>
        <p className='text-sm text-gray-500 mb-1'>
          Selected date{calendar.mode === 'multiple' ? 's' : ''}:
        </p>
        <p className={`font-medium ${dateCount > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
          {dateDisplay}
        </p>
      </div>

      <div className='pt-2 border-t'>
        <p className='text-xs text-gray-500'>Mode and restrictions:</p>
        <ul className='text-xs text-gray-600 mt-1 space-y-1'>
          <li className='flex items-center gap-1'>
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                calendar.mode === 'multiple' ? 'bg-indigo-400' : 'bg-blue-400'
              }`}
            />
            <span className='font-medium'>
              {calendar.mode === 'multiple' ? 'Multi-select' : 'Single-select'}
            </span>
          </li>
          {getCalendarRestrictionDetails(calendar.id, multipleCalendarRestriction).map(
            (restriction, index) => (
              <li key={index} className='flex items-center gap-1'>
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    restriction.type === 'disabled' ? 'bg-red-400' : 'bg-green-400'
                  }`}
                />
                {restriction.text}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
