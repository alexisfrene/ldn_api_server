import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { uploadToCloudinary } from "../../../lib";
import { deleteImageToCloudinary } from "../../../lib/cloudinary";

const Variation = db.Variation;

export const addImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const { user_id } = req.body;
  const file = req.file as Express.Multer.File;
  try {
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
      (value: { id: string }) => value.id === collection_id
    );
    if (!collectionSelected)
      return res
        .status(404)
        .json({ error: true, message: "No se encontró la collection" });
    const values = variation.values.filter(
      (value: { id: string }) => value.id !== collectionSelected.id
    );
    const publicId = await uploadToCloudinary(file, `${user_id}/variations`);
    if (!publicId)
      return res
        .status(500)
        .json({ error: true, message: "No se pudo cargar la imagen" });
    await variation.update({
      values: [
        ...values,
        {
          id: collectionSelected.id,
          label: collectionSelected.label,
          images: [...collectionSelected.images, publicId],
        },
      ],
    });

    return res.status(200).json({
      error: false,
      message: "Todo Ok",
    });
  } catch (error) {
    console.error("Error in addImagesCollection:", error);
    return res
      .status(500)
      .json({ error: true, message: "Error in change image collection" });
  }
};

export const removeImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const { user_id, public_id } = req.body;

  try {
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
  } catch (error) {
    console.error("Error in addImagesCollection:", error);
    return res
      .status(500)
      .json({ error: true, message: "Error in change image collection" });
  }
};
