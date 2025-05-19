import { Request, Response } from "express";
import { getAllSizesService } from "../services/get-all.services";

export const getAllSizes = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getAllSizesService(user_id);
  return res.status(result.status).json(result.body);
};
