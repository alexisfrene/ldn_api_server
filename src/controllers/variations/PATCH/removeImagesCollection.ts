import { Request, Response } from "express";
import { db, deleteImageToCloudinary } from "../../../lib";

const Variation = db.Variation;

export const removeImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const { public_id } = req.body;
  const user_id = req.user;

  if (!user_id)
    return res.status(401).json({ error: true, message: "No autorizado" });
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
    (value: { id: string }) => value.id === collection_id
  );
  if (!collectionSelected)
    return res
      .status(404)
      .json({ error: true, message: "No se encontró la collection" });
  const values = variation.values.filter(
    (value: { id: string }) => value.id !== collectionSelected.id
  );
  await deleteImageToCloudinary(`${user_id}/variations/${public_id}`);
  const newValues = collectionSelected.images.filter(
    (i: string) => i !== public_id
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
