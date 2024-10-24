import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const Variation = models.Variation;
const Product = models.Product;

export const insertVariants = async (req: Request, res: Response) => {
  const productId = req.query.product_id as string;
  const variationId = req.params.id as Uuid;
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
