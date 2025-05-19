import { Request, Response } from "express";
import { getVariationForCategoryService } from "../services/get-by-category.services";

export const getVariationForCategory = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { category, value } = req.query;
  const result = await getVariationForCategoryService(
    user_id,
    category as string,
    value as string,
  );
  return res.status(result.status).json(result.body);
};
