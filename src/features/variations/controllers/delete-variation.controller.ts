import { Request, Response } from "express";
import { deleteVariationByIdService } from "../services/delete-variation.services";

export const deleteVariationById = async (req: Request, res: Response) => {
  const variationId = req.params.id;
  const user_id = req.user;
  const result = await deleteVariationByIdService(variationId, user_id);
  return res.status(result.status).json(result.body);
};
