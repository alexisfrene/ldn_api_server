import { Request, Response } from "express";
import { EventCreation } from "@event-calendar-types/calendar-event";
import { Uuid } from "types";
import { createEventService } from "../services/create-event.services";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const user_id = req.user as Uuid;
    const eventData = req.body as EventCreation;
    const newEvent = await createEventService(user_id, eventData);
    return res.status(200).json(newEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};
