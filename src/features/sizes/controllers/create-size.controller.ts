import { Request, Response } from "express";
import { createSizeService } from "../services/create-size.services";

export const createSize = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { title, values } = req.body;
  const result = await createSizeService(user_id, title, values);
  return res.status(result.status).json(result.body);
};
