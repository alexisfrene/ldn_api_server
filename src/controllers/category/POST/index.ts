import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const Category = db.Category;

export const createCategories = async (req: Request, res: Response) => {
  const { title, values, user_id } = req.body;
  try {
    const newCategory = await Category.create({
      title,
      values,
      user_id,
    });

    return res.status(200).json(newCategory);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
