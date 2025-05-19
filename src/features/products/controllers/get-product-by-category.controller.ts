import { Request, Response } from "express";
import { getProductForCategoryService } from "../services/get-product-by-category.services";

export const getProductForCategory = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.query;
  const user_id = req.user;
  const result = await getProductForCategoryService(
    user_id,
    category_id as string,
    category_value as string,
  );
  return res.status(result.status).json(result.body);
};
