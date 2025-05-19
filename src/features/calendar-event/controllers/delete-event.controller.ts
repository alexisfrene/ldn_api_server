import { Request, Response } from "express";
import { deleteEventService } from "../services/delete-event.services";

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteEventService(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Evento no encontrado", error: true });
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};
