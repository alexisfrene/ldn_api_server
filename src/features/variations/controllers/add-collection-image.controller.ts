import { Request, Response } from "express";
import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const addImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const user_id = req.user;
  const file = req.file as Express.Multer.File;
  if (!user_id)
    return res.status(401).json({ error: true, message: "No autorizado" });
  if (!file)
    return res
      .status(400)
      .json({ error: true, message: "No se paso nada en el cuerpo" });
  if (!variationId)
    return res.status(400).json({ error: true, message: "No autenticado" });
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return res.status(404).json({
      error: true,
      message: "No se encontró la variación seleccionada",
    });
  const collectionSelected = variation.values.find(
    (value: { id: string }) => value.id === collection_id,
  );
  if (!collectionSelected)
    return res
      .status(404)
      .json({ error: true, message: "No se encontró la collection" });
  const values = variation.values.filter(
    (value: { id: string }) => value.id !== collectionSelected.id,
  );
  await uploadToMinio(file, `${user_id}/variations`, user_id);
  if (!file.filename)
    return res
      .status(500)
      .json({ error: true, message: "No se pudo cargar la imagen" });
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

  return res.status(200).json({
    error: false,
    message: "Todo Ok",
  });
};
