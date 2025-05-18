import { Request, Response } from "express";
import { EventCreation } from "@event-calendar-types/calendar-event";
import { models } from "@lib/sequelize";

const EventCalendar = models.EventCalendar;

export const editEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, start, end, allDay, color, location } =
      req.body as EventCreation;

    const eventSelected = await EventCalendar.findByPk(req.params.id);
    if (!eventSelected)
      return res
        .status(404)
        .json({ message: "Evento no encontrado", error: true });

    const updateEvent = await eventSelected.update({
      title,
      description,
      start,
      end,
      allDay,
      color,
      location,
    });

    return res.status(200).json(updateEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};
