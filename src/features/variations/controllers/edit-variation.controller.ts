import { Request, Response } from "express";
import { updateVariationService } from "../services/edit-variation.services";

export const updateProduct = async (req: Request, res: Response) => {
  const variationId = req.params.id;
  const result = await updateVariationService(variationId, req.body);
  return res.status(result.status).json(result.body);
};
