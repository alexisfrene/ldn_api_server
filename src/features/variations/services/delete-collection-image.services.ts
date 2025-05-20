import { deleteFromMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const removeImagesCollectionService = async (
  variationId: string,
  collection_id: string,
  public_id: string,
  user_id: string,
) => {
  if (!public_id)
    return {
      status: 400,
      body: { error: true, message: "No se paso nada en el cuerpo" },
    };
  if (!variationId)
    return { status: 400, body: { error: true, message: "No autenticado" } };

  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return {
      status: 404,
      body: {
        error: true,
        message: "No se encontró la variación seleccionada",
      },
    };

  const collectionSelected = variation.values.find(
    (value: { id: string }) => value.id === collection_id,
  );
  if (!collectionSelected)
    return {
      status: 404,
      body: { error: true, message: "No se encontró la collection" },
    };

  const values = variation.values.filter(
    (value: { id: string }) => value.id !== collectionSelected.id,
  );

  await deleteFromMinio(public_id, `${user_id}/variations`);
  const newImages = collectionSelected.images.filter(
    (i: string) => i !== public_id,
  );

  const updateVariation = await variation.update({
    values: [
      ...values,
      {
        id: collectionSelected.id,
        label: collectionSelected.label,
        images: newImages,
      },
    ],
  });

  return {
    status: 200,
    body: {
      error: false,
      message: "Todo Ok",
      updateVariation,
    },
  };
};
