import { Request, Response } from "express";
import { deleteCategoryValueService } from "../services/delete-value.services";

export const deleteCategoryValue = async (req: Request, res: Response) => {
  const user_id = req.user;
  const category_id = req.params.id;
  const category_value = req.query.value_id as string;
  const result = await deleteCategoryValueService(
    user_id,
    category_id,
    category_value,
  );
  return res.status(result.status).json(result.body);
};
