import { EventCreation } from "@event-calendar-types/calendar-event";
import { Uuid } from "types";
import { models } from "@lib/sequelize";

const EventCalendar = models.EventCalendar;

export const createEventService = async (
  user_id: Uuid,
  eventData: EventCreation,
) => {
  const { title, description, start, end, allDay, color, location } = eventData;
  const newEvent = await EventCalendar.create({
    title,
    description,
    start,
    end,
    allDay,
    color,
    location,
    user_id,
  });
  return newEvent;
};
