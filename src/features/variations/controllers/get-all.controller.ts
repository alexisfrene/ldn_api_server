import { Request, Response } from "express";
import { getAllVariationsService } from "../services/get-all.services";

export const getAllVariations = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getAllVariationsService(user_id, req);
  return res.status(result.status).json(result.body);
};
