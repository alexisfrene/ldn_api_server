import { Request, Response } from "express";
import { getProductByIdService } from "../services/get-by-id.services";

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user_id = req.user;
  const result = await getProductByIdService(productId, user_id, req);
  return res.status(result.status).json(result.body);
};
