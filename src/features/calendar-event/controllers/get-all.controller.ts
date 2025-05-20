import { Request, Response } from "express";
import { getUserCalendarEvents } from "../services/get-all-events.services";

export const getAllEvents = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ message: "No authority", error: true });
  }

  try {
    const events = await getUserCalendarEvents(user_id);
    if (!events) {
      return res.status(404).json({ message: "User not found", error: true });
    }
    return res.status(200).json(events);
  } catch (e) {
    return res.status(400).json([]);
  }
};
