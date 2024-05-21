import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { uploadToCloudinary } from "../../../lib";

const Category = db.Category;

export const createCategories = async (req: Request, res: Response) => {
  try {
    const { title, values, user_id } = req.body;
    const files = req.files as Express.Multer.File[];
    if (!files) return res.status(400).json({ error: "Fatal image" });
    const uploadPromises = files.map(async (file, index) => {
      const image_url = await uploadToCloudinary(file, `${user_id}/categories`);
      return {
        id: `${values[index]}--${index} `,
        value: values[index],
        icon_url: `/categories/${image_url}`,
      };
    });

    const valuesFormatter = await Promise.all(uploadPromises);

    const newCategory = {
      title,
      values: valuesFormatter,
      user_id,
    };
    const category = await Category.create(newCategory);

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
