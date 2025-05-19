import { Request, Response } from "express";
import { getIdsForCategoryNameService } from "../services/get-ids-for-name.services";

export const getIdsForCategoryName = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { collection_item_name } = req.query;
  const result = await getIdsForCategoryNameService(
    user_id,
    collection_item_name as string,
  );
  return res.status(result.status).json(result.body);
};
