import { models } from "@lib/sequelize";

const EventCalendar = models.EventCalendar;

export const deleteEventService = async (event_id: string) => {
  const eventSelected = await EventCalendar.findByPk(event_id);
  if (!eventSelected) return null;
  await eventSelected.destroy();
  return eventSelected;
};
