import { Request, Response } from "express";
import { asyncHandler } from "../../../middleware";

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    res.send(`Producto con ID ${productId} actualizado`);
  }
);
