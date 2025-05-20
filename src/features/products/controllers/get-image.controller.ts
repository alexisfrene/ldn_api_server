import { Request, Response } from "express";
import { getImageProductService } from "../services/get-image.services";

export const getImageProduct = async (req: Request, res: Response) => {
  const user_id = req.user;
  const query = req.query;
  const result = await getImageProductService(user_id, query, req);
  return res.status(result.status).json(result.body);
};
