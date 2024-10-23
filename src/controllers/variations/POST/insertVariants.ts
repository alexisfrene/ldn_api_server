import { Request, Response } from "express";
import { db } from "@lib";

const Variation = db.Variation;
const Product = db.Product;

export const insertVariants = async (req: Request, res: Response) => {
  const productId = req.query.product_id;
  const variationId = req.params.id;
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró la variación" });
  const product = await Product.findByPk(productId);
  if (!product)
    return res.status(400).json({ error: true, message: "User no autorizado" });
  await product.update({ variation_id: variationId });

  return res.status(200).json({ error: false, message: "Todo child" });
};
