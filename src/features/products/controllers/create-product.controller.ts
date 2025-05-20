import { Request, Response } from "express";
import { Uuid } from "types";
import { createProductsService } from "../services/create-product.services";

export const createProducts = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const user_id = req.user as Uuid;
    const result = await createProductsService(user_id, file, req.body);
    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
