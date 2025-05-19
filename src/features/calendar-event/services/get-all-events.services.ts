import { models } from "@lib/sequelize";

const User = models.User;

export const getAllEventsService = async (user_id: string) => {
  const user = await User.findByPk(user_id);
  if (!user) return null;

  const events = await user.getUserEventsCalendar({
    order: [["calendar_event_id", "ASC"]],
  });

  return events.map((event) => ({
    id: event.calendar_event_id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    color: event.color,
    location: event.location,
    description: event.description,
  }));
};
