import { Request, Response } from "express";
import { getIdsForSizeNameService } from "../services/get-size-by-name.services";

export const getIdsForSizeName = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { collection_item_name } = req.query;
  const result = await getIdsForSizeNameService(
    user_id,
    collection_item_name as string,
  );
  return res.status(result.status).json(result.body);
};
