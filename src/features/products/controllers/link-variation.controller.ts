import { Request, Response } from "express";
import { linkVariationService } from "../services/link-variation.services";

export const linkVariation = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const variationId = req.query.variation_id as string;
  const result = await linkVariationService(productId, variationId);
  return res.status(result.status).json(result.body);
};
