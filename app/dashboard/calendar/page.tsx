'use client';

import { useState } from 'react';
import { CalendarId, CalendarState, RestrictionType } from '@/types/calendar';
import { CALENDAR_CONFIGS } from '@/constants/calendar';
import { CalendarGrid, CalendarSummary } from '@/components/calendar';

export default function CalendarDemo() {
  // State for all calendars with elevated restriction state
  const [calendars, setCalendars] = useState<CalendarState[]>(CALENDAR_CONFIGS);

  // Update specific calendar's date
  const updateCalendarDate = (id: CalendarId, newDate: Date | Date[] | undefined) => {
    setCalendars(prevCalendars =>
      prevCalendars.map(calendar =>
        calendar.id === id ? { ...calendar, date: newDate } : calendar
      )
    );
  };

  // Update restriction type for multiple calendar
  const updateCalendarRestriction = (restrictionType: RestrictionType) => {
    setCalendars(prevCalendars =>
      prevCalendars.map(calendar =>
        calendar.id === 'multiple'
          ? { ...calendar, currentRestriction: restrictionType }
          : calendar
      )
    );
  };

  // Clear all calendar selections
  const clearAllSelections = () => {
    setCalendars(prev =>
      prev.map(cal => {
        if (cal.mode === 'multiple') {
          return { ...cal, date: [] };
        }
        return { ...cal, date: undefined };
      })
    );
  };

  // Check if any calendar has a selected date
  const hasSelectedDates = calendars.some(cal => {
    if (cal.mode === 'multiple') {
      const multipleDates = cal.date as Date[] | undefined;
      return multipleDates !== undefined && multipleDates.length > 0;
    }
    const singleDate = cal.date as Date | undefined;
    return singleDate !== undefined;
  });

  // Get multiple calendar restriction
  const getMultipleCalendarRestriction = () => {
    const multipleCalendar = calendars.find(cal => cal.id === 'multiple');
    return multipleCalendar?.currentRestriction || 'past';
  };

  return (
    <div className='space-y-8'>
      {/* Page header */}
      <div className='space-y-2'>
        <h1 className='text-3xl lg:text-4xl font-bold tracking-tight'>
          Advanced calendar selection
        </h1>
        <p className='lg:text-lg text-muted-foreground'>
          Each calendar maintains its own date selection with specific rules and modes.
        </p>
      </div>

      {/* Calendar grid */}
      <CalendarGrid
        calendars={calendars}
        onDateSelect={updateCalendarDate}
        onRestrictionChange={updateCalendarRestriction}
      />

      {/* Summary section */}
      <CalendarSummary
        calendars={calendars}
        onClearAll={clearAllSelections}
        hasSelectedDates={hasSelectedDates}
        multipleCalendarRestriction={getMultipleCalendarRestriction()}
      />
    </div>
  );
}
