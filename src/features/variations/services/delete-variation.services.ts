import { deleteFromMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const deleteVariationByIdService = async (
  variationId: string,
  user_id: string,
) => {
  const variation = await Variation.findByPk(variationId);
  if (!user_id)
    return { status: 401, body: { message: "No autorizado", error: true } };
  if (!variation)
    return {
      status: 404,
      body: { message: "variación no encontrado", error: true },
    };

  for (const value of variation.values) {
    for (const image of value.images) {
      await deleteFromMinio(image, `${user_id}/variations`);
    }
  }

  await variation.destroy();

  return {
    status: 200,
    body: { message: "variación eliminado correctamente" },
  };
};
