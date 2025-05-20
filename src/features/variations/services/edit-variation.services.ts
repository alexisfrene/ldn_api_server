import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const updateVariationService = async (
  variationId: string,
  body: any,
) => {
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return { status: 404, body: { error: "Variación no encontrada" } };

  await variation.update(body);
  return {
    status: 200,
    body: { message: `Variación con ID ${variationId} actualizada` },
  };
};
