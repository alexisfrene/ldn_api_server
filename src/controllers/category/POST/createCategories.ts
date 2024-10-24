import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary, models } from "@lib";

const Category = models.Category;

export const createCategories = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { title, values }: { title: string; values: string[] } = req.body;
  const files = req.files as Express.Multer.File[];
  if (!files) return res.status(400).json({ error: "Fatal image" });
  const uploadPromises = files.map(async (file, index) => {
    const image_url = await uploadToCloudinary(
      file,
      `${user_id}/categories`,
      64,
      64
    );
    return {
      id: uuidv4(),
      value: values[index],
      icon_url: `categories/${image_url}`,
    };
  });

  const valuesFormatter: {
    id: string;
    value: string;
    icon_url: string;
  }[] = await Promise.all(uploadPromises);

  const newCategory = {
    title,
    values: valuesFormatter,
    user_id,
  };
  const category = await Category.create(newCategory);

  return res.status(200).json({ category });
};
