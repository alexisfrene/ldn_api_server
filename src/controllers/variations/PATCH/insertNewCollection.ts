import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary, db } from "../../../lib";

const Variation = db.Variation;

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
