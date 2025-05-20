import { Request, Response } from "express";
import { getByIdCategoryValueService } from "../services/get-value-by-id.services";

export const getByIdCategoryValue = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { id } = req.params;
  const result = await getByIdCategoryValueService(user_id, id);
  return res.status(result.status).json(result.body);
};
