import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { models } from "@lib";
import { Uuid } from "types";
import { uploadToMinio } from "@lib/minio";

const Category = models.Category;

export const createCategories = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const { title, values }: { title: string; values: string[] } = req.body;
    const files = req.files as Express.Multer.File[];
    if (!files) return res.status(400).json({ error: "Fatal image" });
    const uploadPromises = files.map(async (file, index) => {
      await uploadToMinio(file, `${user_id}/categories`, user_id as string);

      return {
        id: uuidv4(),
        value: values[index],
        icon_url: `${files[index].filename}`,
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
      user_id: user_id as Uuid,
    };
    const category = await Category.create(newCategory);

    return res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Fatal error" });
  }
};
