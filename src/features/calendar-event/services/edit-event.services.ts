import { EventCreation } from "@event-calendar-types/calendar-event";
import { models } from "@lib/sequelize";

const EventCalendar = models.EventCalendar;

export const editEventService = async (
  event_id: string,
  eventData: EventCreation,
) => {
  const eventSelected = await EventCalendar.findByPk(event_id);
  if (!eventSelected) return null;

  const { title, description, start, end, allDay, color, location } = eventData;
  const updateEvent = await eventSelected.update({
    title,
    description,
    start,
    end,
    allDay,
    color,
    location,
  });

  return updateEvent;
};
