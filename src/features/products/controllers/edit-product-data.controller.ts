import { Request, Response } from "express";
import { editProductDataService } from "../services/edit-product-data.services";

export const editProductData = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const result = await editProductDataService(productId, req.body);
  return res.status(result.status).json(result.body);
};
