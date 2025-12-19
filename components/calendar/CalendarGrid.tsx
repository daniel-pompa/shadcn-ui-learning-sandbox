import { CalendarState, CalendarId, RestrictionType } from '@/types/calendar';
import { CalendarCard } from './CalendarCard';
import { MultiSelectCalendarCard } from './MultiSelectCalendarCard';

interface CalendarGridProps {
  calendars: CalendarState[];
  onDateSelect: (id: CalendarId, date: Date | Date[] | undefined) => void;
  onRestrictionChange: (restrictionType: RestrictionType) => void;
}

export const CalendarGrid = ({
  calendars,
  onDateSelect,
  onRestrictionChange,
}: CalendarGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {calendars.map(calendar => {
        if (calendar.mode === 'multiple') {
          return (
            <MultiSelectCalendarCard
              key={calendar.id}
              calendar={calendar}
              onDateSelect={dates => onDateSelect(calendar.id, dates)}
              onRestrictionChange={onRestrictionChange}
            />
          );
        }

        return (
          <CalendarCard
            key={calendar.id}
            calendar={calendar}
            onDateSelect={date => onDateSelect(calendar.id, date)}
          />
        );
      })}
    </div>
  );
};
