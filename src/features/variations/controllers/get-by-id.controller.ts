import { Request, Response } from "express";
import { getVariationByIdService } from "../services/get-by-id.services";

export const getVariationById = async (req: Request, res: Response) => {
  const variationId = req.params.id;
  const userId = req.user;
  const result = await getVariationByIdService(variationId, userId, req);
  return res.status(result.status).json(result.body);
};
