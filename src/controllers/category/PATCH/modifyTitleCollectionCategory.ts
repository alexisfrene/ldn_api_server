import { Request, Response } from "express";
import { db } from "../../../lib";

const Category = db.Category;

export const modifyTitleCollectionCategory = async (
  req: Request,
  res: Response
) => {
  const category_id = req.params.id;
  const user_id = req.user;
  const { title } = req.body;
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "Usuario no autorizado" });
  if (!category_id)
    return res
      .status(400)
      .json({ error: true, message: "No se proporciono un id de categoría" });
  const categorySelected = await Category.findByPk(category_id);
  if (!categorySelected)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró la categoría" });
  const updateCategory = await categorySelected.update({
    title,
  });
  return res.status(200).json(updateCategory);
};
