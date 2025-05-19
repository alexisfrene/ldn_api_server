import { Request, Response } from "express";
import { deleteSizeCollectionService } from "../services/delete-collection.services";

export const deleteSizeCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const size_id = req.params.id;
  const result = await deleteSizeCollectionService(user_id, size_id);
  return res.status(result.status).json(result.body);
};
