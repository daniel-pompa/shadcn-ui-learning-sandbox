export type CalendarId = 'business' | 'general' | 'restricted' | 'multiple';

export type CalendarMode = 'single' | 'multiple';

export type RestrictionType = 'none' | 'past' | 'weekend' | 'both';

export interface CalendarState {
  id: CalendarId;
  title: string;
  description: string;
  mode: CalendarMode;
  date: Date | Date[] | undefined;
  disabledCondition?: (date: Date) => boolean;
  currentRestriction?: RestrictionType;
}

export interface DateDetails {
  dayOfWeek: string;
  isoFormat: string;
  formattedDate: string;
}

export interface RestrictionDescription {
  text: string;
  type: 'disabled' | 'enabled';
}

export interface MultiDateDetails {
  count: number;
  formattedDates: string[];
  firstDate: Date | undefined;
  lastDate: Date | undefined;
}
