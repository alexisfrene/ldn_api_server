import { Request, Response } from "express";
import { createVariationService } from "../services/create-variation.services";

export const createVariation = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { title, label, category_id, category_value } = req.body;
  const files = req.files as Express.Multer.File[];
  const result = await createVariationService(
    user_id,
    title,
    label,
    category_id,
    category_value,
    files,
  );
  return res.status(result.status).json(result.body);
};
