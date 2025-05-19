import { Request, Response } from "express";
import { getAllProductsService } from "../services/get-all.services";

export const getAllProducts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getAllProductsService(user_id, req);
  return res.status(result.status).json(result.body);
};
