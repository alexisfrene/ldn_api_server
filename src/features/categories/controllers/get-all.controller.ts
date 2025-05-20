import { Request, Response } from "express";
import { getAllCategoriesService } from "../services/get-all.services";

export const getAllCategories = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getAllCategoriesService(user_id, req);
  return res.status(result.status).json(result.body);
};
