import { Request, Response } from "express";
import { createCategoryService } from "../services/create-category.services";

export const createCategories = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const { title, values }: { title: string; values: string[] } = req.body;
    const files = req.files as Express.Multer.File[];

    const result = await createCategoryService(user_id, title, values, files);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Fatal error" });
  }
};
