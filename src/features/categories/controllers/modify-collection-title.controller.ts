import { Request, Response } from "express";
import { modifyTitleCollectionCategoryService } from "../services/modify-collection-title.services";

export const modifyTitleCollectionCategory = async (
  req: Request,
  res: Response,
) => {
  const category_id = req.params.id;
  const user_id = req.user;
  const { title } = req.body;
  const result = await modifyTitleCollectionCategoryService(
    user_id,
    category_id,
    title,
  );
  return res.status(result.status).json(result.body);
};
