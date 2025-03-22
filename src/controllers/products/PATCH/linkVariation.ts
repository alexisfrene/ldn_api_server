import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const Product = models.Product;

const Variation = models.Variation;

export const linkVariation = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const variationId = req.query.variation_id;
  if (!variationId)
    res
      .status(400)
      .json({ error: true, message: "NO se paso id de la variación" });
  const variation = await Variation.findByPk(variationId as Uuid);
  if (!variation)
    res.status(400).json({ error: true, message: "NO encontró la variación" });
  const product = await Product.findByPk(productId);
  if (!product)
    res.status(400).json({ error: true, message: "NO encontró el producto" });
  await product!.update({ variation_id: variation!.variation_id });

  res.status(200).json({ error: false, message: "Se ligo la variación !" });
};
