import {
  addDays,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";
import { models } from "@lib/sequelize";

const { User, Installment } = models;

const setTimeToStartOfDay = (date: Date) =>
  setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);

const setTimeToEndOfDay = (date: Date) =>
  setMilliseconds(setSeconds(setMinutes(setHours(date, 23), 0), 0), 0);

export const getUserCalendarEvents = async (userId: string) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return [];
  }

  let personalEvents = [];
  let userDebts = [];

  try {
    [personalEvents, userDebts] = await Promise.all([
      user.getUserEventsCalendar({ order: [["calendar_event_id", "ASC"]] }),
      user.getUserDebts({ order: [["debt_id", "ASC"]] }),
    ]);
  } catch (err) {
    return [];
  }

  let result = [];

  let calendarEvents = personalEvents.map((event) => {
    const item = {
      id: event.calendar_event_id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      color: event.color,
      location: event.location,
      description: event.description,
    };

    return item;
  });

  result = [...result, ...calendarEvents];

  for (const debt of userDebts) {
    let installments = [];
    try {
      installments = await Installment.findAll({
        where: { debt_id: debt.debt_id },
        attributes: ["installment_id", "amount", "due_date", "status"],
        order: [["due_date", "ASC"]],
      });
    } catch (err) {
      continue;
    }

    for (const installment of installments) {
      const dueDatePlusOne = addDays(new Date(installment.due_date), 1);

      const event = {
        id: installment.installment_id + 7000,
        title: `${debt.name} - Cuota`,
        start: setTimeToStartOfDay(dueDatePlusOne),
        end: setTimeToEndOfDay(dueDatePlusOne),
        allDay: false,
        color: "red",
        location: "",
        description: `Cuota:${debt.name} - Monto: $${installment.amount} - Estado: ${installment.status}`,
      };

      result.push(event);
    }
  }

  return result || [];
};
