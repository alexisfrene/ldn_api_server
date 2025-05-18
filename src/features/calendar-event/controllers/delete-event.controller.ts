import { Request, Response } from "express";
import { models } from "@lib";

const EventCalendar = models.EventCalendar;

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventSelected = await EventCalendar.findByPk(req.params.id);
    if (!eventSelected)
      return res
        .status(404)
        .json({ message: "Evento no encontrado", error: true });
    const deleteEvent = await eventSelected.destroy();
    return res.status(200).json(deleteEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};
