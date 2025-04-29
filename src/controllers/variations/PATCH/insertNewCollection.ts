import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";
import { uploadToMinio } from "@lib/minio";

const Variation = models.Variation;

export const insertNewCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { label }: { label: string } = req.body;
  const files = req.files as Express.Multer.File[];
  const { id: variationId } = req.params;
  const variation = await Variation.findByPk(variationId);
  if (!variation)
    return res
      .status(500)
      .json({ error: true, message: "Error insertNewCollection" });
  const uploadPromises = files.map(async file => {
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

  return res.status(200).json({ newCollection });
};
