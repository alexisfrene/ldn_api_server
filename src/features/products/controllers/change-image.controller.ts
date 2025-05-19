import { Request, Response } from "express";
import { changeImageProductService } from "../services/change-image.services";

export const changeImageProduct = async (req: Request, res: Response) => {
  const userId = req.user;
  const file = req.file as Express.Multer.File;
  const productId = req.params.id;

  const result = await changeImageProductService(userId, file, productId);
  return res.status(result.status).json(result.body);
};
