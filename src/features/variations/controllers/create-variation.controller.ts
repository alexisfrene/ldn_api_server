import { Request, Response } from "express";
import { Uuid } from "types";
import { uploadToMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const User = models.User;
const Variation = models.Variation;
const Category = models.Category;

export const createVariation = async (req: Request, res: Response) => {
  const user_id = req.user;
  const {
    title,
    label,
    category_id,
    category_value,
  }: {
    title: string;
    label: string;
    category_id: Uuid;
    category_value: Uuid;
  } = req.body;
  const files = req.files as Express.Multer.File[];
  if (!files)
    return res
      .status(400)
      .json({ error: true, message: "No se paso imágenes" });
  const user = await User.findByPk(user_id);
  if (!user)
    return res
      .status(400)
      .json({ error: true, message: "Usuario no autorizado" });
  let newVariation = {
    category_id: crypto.randomUUID() as Uuid,
    category_value: crypto.randomUUID() as Uuid,
    title: "",
    values: [{ id: crypto.randomUUID() as Uuid, label, images: [""] }],
    user_id: crypto.randomUUID() as Uuid,
  };
  if (category_id) {
    const category = await Category.findByPk(category_id);

    if (category) {
      const verifyCategory = category.values.find(
        (value: { id: string }) => value.id === category_value,
      );

      if (verifyCategory) {
        newVariation["category_id"] = category_id;
        newVariation["category_value"] = category_value;
      }
    }
  }
  const uploadPromises = files.map(async (file) => {
    await uploadToMinio(file, `${user_id}/variations`, user_id as string);

    return file.filename || "";
  });
  const images = await Promise.all(uploadPromises);
  newVariation["title"] = title;
  newVariation["values"] = [{ id: crypto.randomUUID() as Uuid, label, images }];
  if (user_id) {
    newVariation["user_id"] = user_id;
  }

  const variation = await Variation.create(newVariation);

  return res.status(200).json({ variation });
};
