import { Request, Response } from "express";
import { deleteFromMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Variation = models.Variation;

export const removeImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const { public_id } = req.body;
  const user_id = req.user;

  if (!public_id)
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

  await deleteFromMinio(public_id, `${user_id}/variations`);
  const newValues = collectionSelected.images.filter((i: string) =>
    i.includes(public_id) ? false : i,
  );

  const updateVariation = await variation.update({
    values: [
      ...values,
      {
        id: collectionSelected.id,
        label: collectionSelected.label,
        images: newValues,
      },
    ],
  });

  return res.status(200).json({
    error: false,
    message: "Todo Ok",
    updateVariation,
  });
};
