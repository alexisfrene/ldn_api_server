import { Request, Response } from "express";
import { models } from "@lib";

const User = models.User;

export const getVariationForCategory = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { category, value } = req.query as {
    category: number | undefined;
    value: string | undefined;
  };
  if (!user_id) return res.status(401).json({ error: "No authority" });
  const user = await User.findByPk(user_id);
  if (!user)
    return res.status(400).json({ error: true, message: "No autorizado" });
  if (!category || !value)
    return res.status(400).json({
      error: true,
      message: "No se paso los parámetros esperados",
    });
  const categories = await user?.getUserCategories();
  const categoryForCategory = categories.filter(
    (item) =>
      item.category_id === category &&
      item.values.find((item: { id: string }) => item.id === value)
  );
  if (!categoryForCategory)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró la categoría" });
  const variations = await user?.getUserVariations().then((res: any[]) => {
    return res.filter(
      (variation) =>
        variation.category_id === category && variation.category_value === value
    );
  });
  if (!variations)
    return res
      .status(400)
      .json({ error: true, message: "No se encontraron variaciones" });

  return res.status(200).json({ variations, hola: "hola" });
};
