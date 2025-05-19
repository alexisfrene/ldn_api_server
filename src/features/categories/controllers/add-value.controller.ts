import { Request, Response } from "express";
import { addCategoryValueService } from "../services/add-value.services";

export const addCategoryValue = async (req: Request, res: Response) => {
  const category_id = req.params.id;
  const user_id = req.user;
  const { value } = req.body;
  const files = req.files as Express.Multer.File[];

  const result = await addCategoryValueService(
    user_id,
    category_id,
    value,
    files,
  );
  return res.status(result.status).json(result.body);
};
