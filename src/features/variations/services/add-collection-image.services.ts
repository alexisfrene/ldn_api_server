import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const addImagesCollectionService = async (
  variationId: string,
  collection_id: string,
  user_id: string,
  file: Express.Multer.File,
) => {
  if (!user_id)
    return { status: 401, body: { error: true, message: "No autorizado" } };
  if (!file)
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
  await uploadToMinio(file, `${user_id}/variations`, user_id);
  if (!file.filename)
    return {
      status: 500,
      body: { error: true, message: "No se pudo cargar la imagen" },
    };

  await variation.update({
    values: [
      ...values,
      {
        id: collectionSelected.id,
        label: collectionSelected.label,
        images: [...collectionSelected.images, file.filename],
      },
    ],
  });

  return {
    status: 200,
    body: {
      error: false,
      message: "Todo Ok",
    },
  };
};
