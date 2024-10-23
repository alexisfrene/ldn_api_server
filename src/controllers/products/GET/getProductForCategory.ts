import { Request, Response } from "express";
import { db } from "@lib";

const User = db.User;

const Category = db.Category;

export const getProductForCategory = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.query;
  const user_id = req.user;

  const user = await User.findByPk(user_id || "");
  const products = user?.getUserProducts() ? await user.getUserProducts() : [];
  if (!products)
    return res.status(400).json({
      error: true,
      message: "El usuario no tiene productos cargados",
    });
  const category = await Category.findByPk(category_id || "");

  if (!category)
    return res
      .status(400)
      .json({ error: true, message: "Categoría no encontrado" });
  const categoryValue = category?.values.find(
    (value: { id: string }) => value.id === category_value
  );
  if (!categoryValue)
    return res.status(400).json({
      error: true,
      message: "No se encontró el valor de la categoría",
    });
  const productsForCAtegory = products.filter(
    (product: { category_id: string; category_value: string }) =>
      product.category_id === category_id &&
      product.category_value === category_value
  );
  return res.status(200).json({ res: productsForCAtegory });
};
