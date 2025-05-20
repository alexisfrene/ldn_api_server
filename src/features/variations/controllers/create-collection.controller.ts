import { Request, Response } from "express";
import { insertNewCollectionService } from "../services/create-collection.services";

export const insertNewCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { label } = req.body;
  const files = req.files as Express.Multer.File[];
  const { id: variationId } = req.params;
  const result = await insertNewCollectionService(
    user_id,
    variationId,
    label,
    files,
  );
  return res.status(result.status).json(result.body);
};
