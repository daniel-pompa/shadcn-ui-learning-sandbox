import { format } from 'date-fns';
import { DateDetails, MultiDateDetails } from '@/types/calendar';

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @returns Formatted date string or "No date selected"
 */
export const formatDate = (date: Date | undefined): string => {
  if (!date) return 'No date selected';
  return format(date, 'PPP'); // Format: "Month DD, YYYY"
};

/**
 * Format multiple dates to a readable string
 * @param dates - Array of dates to format
 * @returns Formatted string with count and dates
 */
export const formatMultipleDates = (dates: Date[]): string => {
  if (!dates || dates.length === 0) return 'No dates selected';

  if (dates.length === 1) {
    return format(dates[0], 'PPP');
  }

  const formattedDates = dates.map(date => format(date, 'MMM dd'));
  return `${dates.length} dates selected: ${formattedDates.join(', ')}`;
};

/**
 * Get detailed date information
 * @param date - Date to analyze
 * @returns Object with day of week, ISO format, and formatted date
 */
export const getDateDetails = (date: Date | undefined): DateDetails => {
  if (!date) {
    return {
      dayOfWeek: '',
      isoFormat: '',
      formattedDate: 'No date selected',
    };
  }

  return {
    dayOfWeek: format(date, 'EEEE'),
    isoFormat: format(date, 'yyyy-MM-dd'),
    formattedDate: format(date, 'PPP'),
  };
};

/**
 * Get detailed information for multiple dates
 * @param dates - Array of dates
 * @returns Object with count, formatted dates, and range
 */
export const getMultiDateDetails = (dates: Date[] | undefined): MultiDateDetails => {
  if (!dates || dates.length === 0) {
    return {
      count: 0,
      formattedDates: [],
      firstDate: undefined,
      lastDate: undefined,
    };
  }

  // Sort dates chronologically
  const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());

  return {
    count: sortedDates.length,
    formattedDates: sortedDates.map(date => format(date, 'PPP')),
    firstDate: sortedDates[0],
    lastDate: sortedDates[sortedDates.length - 1],
  };
};

/** Format date to ISO format (yyyy-MM-dd) */
export const formatToISO = (date: Date): string => format(date, 'yyyy-MM-dd');

/** Format date to short month/day (MMM dd) */
export const formatToShort = (date: Date): string => format(date, 'MMM dd');

/** Create a date object with time set to midnight (start of day) */
export const getStartOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/** Get today's date at midnight (start of day) */
export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
