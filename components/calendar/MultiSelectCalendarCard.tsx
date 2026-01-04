import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Check } from 'lucide-react';
import { CalendarState, RestrictionType } from '@/types/calendar';
import {
  formatMultipleDates,
  getMultiDateDetails,
  formatToISO,
  formatToShort,
  getToday,
} from '@/lib/date-utils';
import { getRestrictionCondition, getRestrictionDescription } from '@/constants/calendar';
import { cn } from '@/lib/utils';

interface MultiSelectCalendarCardProps {
  calendar: CalendarState;
  onDateSelect: (dates: Date[] | undefined) => void;
  onRestrictionChange: (restrictionType: RestrictionType) => void;
}

export const MultiSelectCalendarCard = ({
  calendar,
  onDateSelect,
  onRestrictionChange,
}: MultiSelectCalendarCardProps) => {
  const dates = calendar.date as Date[] | undefined;
  const dateDetails = getMultiDateDetails(dates);
  const currentRestriction = calendar.currentRestriction || 'past';

  // Get restriction condition function
  const getDisabledDates = getRestrictionCondition(currentRestriction);

  // Handle restriction change
  const handleRestrictionChange = (restrictionType: RestrictionType) => {
    onRestrictionChange(restrictionType);
  };

  // Check if today is disabled
  const isTodayDisabled = getDisabledDates(getToday());

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
            variant={dateDetails.count > 0 ? 'default' : 'outline'}
            className={cn(
              dateDetails.count > 0
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300'
                : 'dark:text-gray-400 dark:border-slate-700'
            )}
          >
            {dateDetails.count > 0 ? `${dateDetails.count} selected` : 'Pending'}
          </Badge>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          {calendar.description}
        </p>

        {/* Restriction selector */}
        <div className='mt-4'>
          <p className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-tight'>
            Select restriction type:
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {(['none', 'past', 'weekend', 'both'] as RestrictionType[]).map(type => (
              <button
                key={type}
                onClick={() => handleRestrictionChange(type)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded-full border transition-all duration-200 flex items-center justify-center',
                  currentRestriction === type
                    ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-slate-900 dark:text-gray-400 dark:border-slate-800 dark:hover:bg-slate-800'
                )}
              >
                {currentRestriction === type && (
                  <Check className='h-3 w-3 mr-1.5 animate-in zoom-in duration-300' />
                )}
                <span className='truncate'>
                  {type === 'none' && 'No restrictions'}
                  {type === 'past' && 'Past dates disabled'}
                  {type === 'weekend' && 'Weekends disabled'}
                  {type === 'both' && 'Both disabled'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4 pt-6'>
        {/* Calendar component */}
        <div className='flex justify-center'>
          <Calendar
            mode='multiple'
            selected={dates}
            onSelect={onDateSelect}
            disabled={getDisabledDates}
            className='rounded-md border dark:border-slate-800 dark:bg-slate-900/20'
            autoFocus
          />
        </div>

        {/* Selected dates display */}
        <div className='pt-4 border-t dark:border-slate-800'>
          <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2'>
            <CalendarIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            <span className='font-medium'>Selected dates</span>
          </div>
          <div
            className={cn(
              'p-3 rounded-lg border transition-colors',
              dateDetails.count > 0
                ? 'bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50'
                : 'bg-gray-50 border-gray-100 dark:bg-slate-900/50 dark:border-slate-800'
            )}
          >
            <p
              className={cn(
                'font-medium text-sm',
                dateDetails.count > 0
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-500'
              )}
            >
              {formatMultipleDates(dates || [])}
            </p>

            {/* Additional date information */}
            {dateDetails.count > 0 && (
              <div className='mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-400'>
                {dateDetails.count === 1 ? (
                  <div className='flex justify-between items-center'>
                    <span className='font-medium'>Single date selected</span>
                    <span className='font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded border dark:border-slate-700 shadow-sm'>
                      {dateDetails.firstDate && formatToISO(dateDetails.firstDate)}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className='flex justify-between items-center'>
                      <span className='flex items-center gap-1'>
                        Range:{' '}
                        <b className='text-gray-900 dark:text-gray-200'>
                          {dateDetails.firstDate && formatToShort(dateDetails.firstDate)}{' '}
                          → {dateDetails.lastDate && formatToShort(dateDetails.lastDate)}
                        </b>
                      </span>
                      <span className='bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded text-blue-700 dark:text-blue-300'>
                        {dateDetails.count} days
                      </span>
                    </div>

                    {/* Show all selected dates for small selections */}
                    {dateDetails.count <= 5 && (
                      <div className='mt-2 pt-2 border-t border-gray-200 dark:border-slate-800'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-1.5'>
                          {dateDetails.formattedDates.map((date, index) => (
                            <span
                              key={index}
                              className='px-2 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-[10px] text-center shadow-xs'
                            >
                              {date}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Instructions for multi-select */}
            {dateDetails.count === 0 && (
              <div className='mt-2'>
                <p className='text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-widest'>
                  Configuration & Help
                </p>
                <ul className='text-xs text-gray-600 dark:text-gray-400 space-y-1.5'>
                  <li className='flex items-center gap-2'>
                    <div className='h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]' />
                    <span className='font-medium dark:text-gray-300'>
                      Multi-select enabled
                    </span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600' />
                    Hold{' '}
                    <kbd className='px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded text-[10px]'>
                      Ctrl/Cmd
                    </kbd>{' '}
                    for multiple
                  </li>
                  <li className='flex items-center gap-2'>
                    <div
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition-colors',
                        currentRestriction === 'none' ? 'bg-green-500' : 'bg-orange-500'
                      )}
                    />
                    {getRestrictionDescription(currentRestriction)}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        {dateDetails.count > 0 && (
          <div className='flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300'>
            <button
              onClick={() => onDateSelect([])}
              className='flex-1 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-all border border-red-200 dark:border-red-900/50 cursor-pointer'
            >
              Clear selection
            </button>
            <button
              onClick={() => onDateSelect([new Date()])}
              disabled={isTodayDisabled}
              className='flex-1 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md transition-all border border-blue-200 dark:border-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              Select today
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
