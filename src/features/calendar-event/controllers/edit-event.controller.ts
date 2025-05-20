import { Request, Response } from "express";
import { EventCreation } from "@event-calendar-types/calendar-event";
import { editEventService } from "../services/edit-event.services";

export const editEvent = async (req: Request, res: Response) => {
  try {
    const eventData = req.body as EventCreation;
    const updateEvent = await editEventService(req.params.id, eventData);
    if (!updateEvent)
      return res
        .status(404)
        .json({ message: "Evento no encontrado", error: true });

    return res.status(200).json(updateEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};
