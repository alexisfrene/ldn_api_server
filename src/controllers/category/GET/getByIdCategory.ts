import { Request, Response } from "express";
import { db } from "../../../lib";

const User = db.User;

export const getByIdCategory = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { id } = req.params;

  if (!user_id) {
    return res.status(401).json({ error: "No authority" });
  }

  if (!id) {
    return res
      .status(400)
      .json({ error: "No se proporcionó un id para buscar una categoría" });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user || !user.getCategories) {
      return res
        .status(400)
        .json({ error: true, message: "El usuario no tiene categorías" });
    }

    const categories = await user.getUser_categories({
      order: [["category_id", "ASC"]],
    });
    const selectedCategory = categories.find(
      (category: { category_id: string }) => category.category_id === id
    );

    return res.status(200).json(selectedCategory);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};
