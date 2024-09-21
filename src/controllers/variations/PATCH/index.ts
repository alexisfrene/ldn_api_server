import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary, db, deleteImageToCloudinary } from "../../../lib";

const Variation = db.Variation;

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
};

export const removeImagesCollection = async (req: Request, res: Response) => {
  const { id: variationId } = req.params;
  const { collection_id } = req.query;
  const { user_id, public_id } = req.body;

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

export const insertNewCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { label } = req.body;
  const files = req.files as Express.Multer.File[];
  const { id: variationId } = req.params;
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return res
      .status(500)
      .json({ error: true, message: "Error insertNewCollection" });
  const uploadPromises = files.map(async (file) => {
    const image_url = await uploadToCloudinary(file, `${user_id}/variations`);

    return image_url;
  });
  const images = await Promise.all(uploadPromises);
  const newCollection = {
    id: uuidv4(),
    label,
    images,
  };
  await variation.update({ values: [...variation.values, newCollection] });

  return res.status(200).json({ newCollection });
};
