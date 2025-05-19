import { Request, Response } from "express";
import { modifyTitleCollectionSizeService } from "../services/edit-collection-title.services";

export const modifyTitleCollectionSize = async (
  req: Request,
  res: Response,
) => {
  const size_id = req.params.id;
  const user_id = req.user;
  const { title } = req.body;
  const result = await modifyTitleCollectionSizeService(
    user_id,
    size_id,
    title,
  );
  return res.status(result.status).json(result.body);
};
