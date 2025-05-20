import { Request, Response } from "express";
import { deleteSizeValueService } from "../services/delete-value.services";

export const deleteSizeValue = async (req: Request, res: Response) => {
  const user_id = req.user;
  const size_id = req.params.id;
  const size_value = req.query.value_id as string;
  const result = await deleteSizeValueService(user_id, size_id, size_value);
  return res.status(result.status).json(result.body);
};
