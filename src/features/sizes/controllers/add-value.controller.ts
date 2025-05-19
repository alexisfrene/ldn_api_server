import { Request, Response } from "express";
import { addSizeValueService } from "../services/add-value.services";

export const addSizeValue = async (req: Request, res: Response) => {
  const size_id = req.params.id;
  const user_id = req.user;
  const { value }: { value: string } = req.body;
  const result = await addSizeValueService(user_id, size_id, value);
  return res.status(result.status).json(result.body);
};
