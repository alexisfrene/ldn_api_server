import { Request, Response } from "express";
import { EventCreation } from "@event-calendar-types/calendar-event";
import { Uuid } from "types";
import { models } from "@lib";

const EventCalendar = models.EventCalendar;

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, start, end, allDay, color, location } =
      req.body as EventCreation;

    const newEvent = await EventCalendar.create({
      title,
      description,
      start,
      end,
      allDay,
      color,
      location,
      user_id: req.user as Uuid,
    });
    console.log(newEvent);

    return res.status(200).json([]);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};
