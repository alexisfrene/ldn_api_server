import { Uuid } from "types";
import { models } from "@lib/sequelize";

const Variation = models.Variation;
const Product = models.Product;

export const insertVariantsService = async (
  productId: string,
  variationId: Uuid,
) => {
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return {
      status: 400,
      body: { error: true, message: "No se encontró la variación" },
    };

  const product = await Product.findByPk(productId);
  if (!product)
    return {
      status: 400,
      body: { error: true, message: "User no autorizado" },
    };
  await product.update({ variation_id: variationId });

  return { status: 200, body: { error: false, message: "Todo child" } };
};
