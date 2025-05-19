import { Request, Response } from "express";
import { Uuid } from "types";
import { insertVariantsService } from "../services/link-variation.services";

export const insertVariants = async (req: Request, res: Response) => {
  const productId = req.query.product_id as string;
  const variationId = req.params.id as Uuid;
  const result = await insertVariantsService(productId, variationId);
  return res.status(result.status).json(result.body);
};
