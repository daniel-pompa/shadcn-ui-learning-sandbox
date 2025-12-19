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
    <Card key={calendar.id} className='overflow-hidden shadow-sm pt-0'>
      <CardHeader className='bg-gray-100/50 py-4 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold flex items-center gap-2'>
            <CalendarIcon className='h-4 w-4 text-gray-500' />
            {calendar.title}
          </CardTitle>
          <Badge
            variant={dateDetails.count > 0 ? 'default' : 'outline'}
            className={
              dateDetails.count > 0 ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''
            }
          >
            {dateDetails.count > 0 ? `${dateDetails.count} selected` : 'Pending'}
          </Badge>
        </div>
        <p className='text-sm text-gray-500 mt-1'>{calendar.description}</p>

        {/* Restriction selector */}
        <div className='mt-3'>
          <p className='text-xs font-medium text-gray-700 mb-2'>
            Select restriction type:
          </p>
          <div className='grid md:grid-cols-2 gap-2'>
            {(['none', 'past', 'weekend', 'both'] as RestrictionType[]).map(type => (
              <button
                key={type}
                onClick={() => handleRestrictionChange(type)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  currentRestriction === type
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {currentRestriction === type && <Check className='inline h-3 w-3 mr-1' />}
                {type === 'none' && 'No restrictions'}
                {type === 'past' && 'Past dates disabled'}
                {type === 'weekend' && 'Weekends disabled'}
                {type === 'both' && 'Both disabled'}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4 pt-4'>
        {/* Calendar component */}
        <div className='flex justify-center'>
          <Calendar
            mode='multiple'
            selected={dates}
            onSelect={onDateSelect}
            disabled={getDisabledDates}
            className='rounded-md border'
            autoFocus
          />
        </div>

        {/* Selected dates display */}
        <div className='pt-4 border-t'>
          <div className='flex items-center gap-2 text-sm text-gray-700 mb-2'>
            <CalendarIcon className='h-4 w-4 text-gray-500' />
            <span className='font-medium'>Selected dates</span>
          </div>
          <div
            className={`p-3 rounded-lg border ${
              dateDetails.count > 0
                ? 'bg-blue-50 border-blue-100'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <p
              className={`font-medium ${
                dateDetails.count > 0 ? 'text-blue-700' : 'text-gray-500'
              }`}
            >
              {formatMultipleDates(dates || [])}
            </p>

            {/* Additional date information */}
            {dateDetails.count > 0 && (
              <div className='mt-3 space-y-2 text-xs text-gray-600'>
                {dateDetails.count === 1 ? (
                  <div className='flex justify-between items-center'>
                    <span className='font-medium'>Single date selected</span>
                    <span className='font-mono bg-gray-100 px-2 py-1 rounded'>
                      {dateDetails.firstDate && formatToISO(dateDetails.firstDate)}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className='flex gap-2'>
                      <span>Date range:</span>
                      <div className='flex gap-2'>
                        <span className='font-medium'>
                          {dateDetails.firstDate && formatToShort(dateDetails.firstDate)}
                          {' → '}
                          {dateDetails.lastDate && formatToShort(dateDetails.lastDate)}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {dateDetails.count} days total
                        </span>
                      </div>
                    </div>

                    {/* Show all selected dates for small selections */}
                    {dateDetails.count <= 5 && (
                      <div className='mt-2 pt-2 border-t border-gray-200'>
                        <p className='font-medium mb-1'>Selected dates:</p>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-1 text-center'>
                          {dateDetails.formattedDates.map((date, index) => (
                            <span
                              key={index}
                              className='px-2 py-1 bg-white border border-gray-200 rounded text-xs'
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
                <p className='text-xs font-medium text-gray-700 mb-2'>
                  Mode and instructions:
                </p>
                <ul className='text-xs text-gray-600 space-y-1'>
                  <li className='flex items-center gap-1'>
                    <div className='h-1.5 w-1.5 rounded-full bg-blue-400' />
                    <span className='font-medium'>Multi-select mode</span>
                  </li>
                  <li className='flex items-center gap-1'>
                    <div className='h-1.5 w-1.5 rounded-full bg-gray-400' />
                    Click to select a date
                  </li>
                  <li className='flex items-center gap-1'>
                    <div className='h-1.5 w-1.5 rounded-full bg-gray-400' />
                    Hold Ctrl/Cmd to select multiple dates
                  </li>
                  <li className='flex items-center gap-1'>
                    <div className='h-1.5 w-1.5 rounded-full bg-gray-400' />
                    Click a selected date to deselect
                  </li>
                  <li className='flex items-center gap-1'>
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        currentRestriction === 'none' ? 'bg-green-400' : 'bg-red-400'
                      }`}
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
          <div className='flex gap-2'>
            <button
              onClick={() => onDateSelect([])}
              className='flex-1 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-200 cursor-pointer'
            >
              Clear selection
            </button>
            <button
              onClick={() => {
                const today = new Date();
                onDateSelect([today]);
              }}
              className='flex-1 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded-md transition-colors duration-200 border border-blue-200 cursor-pointer'
              disabled={isTodayDisabled}
            >
              Select today
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
