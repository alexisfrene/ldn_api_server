import { Request, Response } from "express";
import { editProductDetailsService } from "../services/edit-product-details.services";

export const editProductDetails = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const result = await editProductDetailsService(productId, req.body);
  return res.status(result.status).json(result.body);
};
