import { Request, Response } from "express";
import { deleteProductService } from "../services/delete-product.services";

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const result = await deleteProductService(productId);
  return res.status(result.status).json(result.body);
};
