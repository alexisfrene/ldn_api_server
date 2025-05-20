import { Request, Response } from "express";
import { deleteCategoryCollectionService } from "../services/delete-collection.services";

export const deleteCategoryCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const category_id = req.params.id;
  const result = await deleteCategoryCollectionService(user_id, category_id);
  return res.status(result.status).json(result.body);
};
