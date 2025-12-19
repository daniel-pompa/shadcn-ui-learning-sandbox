import { CalendarState, RestrictionType } from '@/types/calendar';

/** Check if a date is a weekend (Saturday or Sunday) */
export const isWeekend = (date: Date): boolean => {
  return date.getDay() === 0 || date.getDay() === 6;
};

/** Check if a date is in the past (before today) */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateToCheck = new Date(date);
  dateToCheck.setHours(0, 0, 0, 0);
  return dateToCheck < today;
};

/** Get restriction condition based on type */
export const getRestrictionCondition = (type: RestrictionType) => {
  switch (type) {
    case 'none':
      return () => false;
    case 'past':
      return isPastDate;
    case 'weekend':
      return isWeekend;
    case 'both':
      return (date: Date) => isPastDate(date) || isWeekend(date);
    default:
      return () => false;
  }
};

/** Get description for a restriction type */
export const getRestrictionDescription = (type: RestrictionType) => {
  const descriptions = {
    none: 'No date restrictions',
    past: 'Past dates are disabled',
    weekend: 'Weekends are disabled',
    both: 'Past dates and weekends are disabled',
  };
  return descriptions[type];
};

/** Get restriction details for calendar summary */
export const getCalendarRestrictionDetails = (
  calendarId: string,
  restrictionType?: RestrictionType
) => {
  // For multiple calendar with dynamic restrictions
  if (calendarId === 'multiple' && restrictionType) {
    const base = [
      { text: 'Select multiple dates', type: 'enabled' as const },
      { text: 'Hold Ctrl/Cmd for multi-select', type: 'enabled' as const },
    ];

    if (restrictionType === 'none') {
      return [...base, { text: 'No date restrictions', type: 'enabled' as const }];
    } else if (restrictionType === 'past') {
      return [...base, { text: 'Past dates disabled', type: 'disabled' as const }];
    } else if (restrictionType === 'weekend') {
      return [...base, { text: 'Weekends disabled', type: 'disabled' as const }];
    } else {
      return [
        ...base,
        { text: 'Past dates disabled', type: 'disabled' as const },
        { text: 'Weekends disabled', type: 'disabled' as const },
      ];
    }
  }

  // For static calendars
  const staticRestrictions = {
    business: [
      { text: 'Saturdays disabled', type: 'disabled' as const },
      { text: 'Sundays disabled', type: 'disabled' as const },
    ],
    general: [{ text: 'No date restrictions', type: 'enabled' as const }],
    restricted: [{ text: 'Past dates disabled', type: 'disabled' as const }],
    multiple: [
      { text: 'Select multiple dates', type: 'enabled' as const },
      { text: 'Hold Ctrl/Cmd for multi-select', type: 'enabled' as const },
      { text: 'Dynamic restrictions', type: 'enabled' as const },
    ],
  };

  return staticRestrictions[calendarId as keyof typeof staticRestrictions] || [];
};

/** Calendar configurations for initial state */
export const CALENDAR_CONFIGS: CalendarState[] = [
  {
    id: 'business',
    title: 'Business calendar',
    description: 'Weekends disabled for business days',
    mode: 'single',
    date: new Date(),
    disabledCondition: (date: Date) => isWeekend(date),
  },
  {
    id: 'general',
    title: 'General calendar',
    description: 'All dates available',
    mode: 'single',
    date: undefined,
  },
  {
    id: 'restricted',
    title: 'Restricted calendar',
    description: 'Past dates disabled',
    mode: 'single',
    date: undefined,
    disabledCondition: (date: Date) => isPastDate(date),
  },
  {
    id: 'multiple',
    title: 'Calendar',
    description: 'Select multiple dates with dynamic restrictions',
    mode: 'multiple',
    date: [],
    currentRestriction: 'past', // Default restriction
  },
];
