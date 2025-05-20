import { Request, Response } from "express";
import { getTotalMonthService } from "../services/get-total-month.services";

export const getTotalMonth = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const result = await getTotalMonthService(user_id);
    return res.status(result.status).json(result.body);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error });
  }
};
