import { Request, Response } from "express";
import { models } from "@lib";

const Product = models.Product;

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.update({ state: false });
    if (!product.state) {
      res.status(200).json("Eliminación exitosa!");
    }
  }

  res.status(500).json("No se pudo eliminar");
};
