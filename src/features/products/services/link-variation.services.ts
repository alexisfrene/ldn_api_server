import { Uuid } from "types";
import { models } from "@lib/sequelize";

const Product = models.Product;
const Variation = models.Variation;

export const linkVariationService = async (
  productId: string,
  variationId: string,
) => {
  if (!variationId)
    return {
      status: 400,
      body: { error: true, message: "NO se paso id de la variación" },
    };
  const variation = await Variation.findByPk(variationId as Uuid);
  if (!variation)
    return {
      status: 400,
      body: { error: true, message: "NO encontró la variación" },
    };
  const product = await Product.findByPk(productId);
  if (!product)
    return {
      status: 400,
      body: { error: true, message: "NO encontró el producto" },
    };
  await product.update({ variation_id: variation.variation_id });

  return {
    status: 200,
    body: { error: false, message: "Se ligo la variación !" },
  };
};
