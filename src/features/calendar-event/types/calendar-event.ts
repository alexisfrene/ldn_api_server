export interface EventCreation {
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  location?: string;
}

export interface CalendarEvent extends EventCreation {
  id: string;
}
