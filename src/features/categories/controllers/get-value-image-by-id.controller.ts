import { Request, Response } from "express";
import { getByIdValueImageURLService } from "../services/get-value-image-by-id.services";

export const getByIdValueImageURL = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { id } = req.params;
  const result = await getByIdValueImageURLService(user_id, id, req);
  return res.status(result.status).json(result.body);
};
