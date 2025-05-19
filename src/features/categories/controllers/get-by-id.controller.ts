import { Request, Response } from "express";
import { getByIdCategoryService } from "../services/get-by-id.services";

export const getByIdCategory = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { id } = req.params;
  const result = await getByIdCategoryService(user_id, id);
  return res.status(result.status).json(result.body);
};
