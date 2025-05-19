import { Uuid } from "types";
import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const insertNewCollectionService = async (
  user_id: string,
  variationId: string,
  label: string,
  files: Express.Multer.File[],
) => {
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return {
      status: 500,
      body: { error: true, message: "Error insertNewCollection" },
    };

  const uploadPromises = files.map(async (file) => {
    await uploadToMinio(file, `${user_id}/variations`, user_id as string);
    return file.filename || "";
  });
  const images = await Promise.all(uploadPromises);

  const newCollection = {
    id: crypto.randomUUID() as Uuid,
    label,
    images,
  };
  await variation.update({ values: [...variation.values, newCollection] });

  return { status: 200, body: { newCollection } };
};
