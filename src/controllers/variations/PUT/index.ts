import { Request, Response } from "express";

export const updateProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  res.send(`Producto con ID ${productId} actualizado`);
};
