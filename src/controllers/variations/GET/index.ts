import { Request, Response } from "express";
import db from "../../../lib/sequelize";

const User = db.User;

export const getAllVariations = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.body.user_id);
    if (!user)
      return res.status(400).json({ error: true, message: "No autorizado" });

    const variations = await user?.getVariations();
    if (!variations)
      return res
        .status(400)
        .json({ error: true, message: "No se encontraron variaciones" });

    return res.status(200).json(variations);
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);

    return res.status(500).json({ error: true, message: error });
  }
};

export const getVariationForCategory = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const { category, value } = req.query as {
      category: string | undefined;
      value: string | undefined;
    };
    if (!user_id) return res.status(401).json({ error: "No authority" });
    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(400).json({ error: true, message: "No autorizado" });
    if (!category || !value)
      return res
        .status(400)
        .json({ error: true, message: "No se paso los parámetros esperados" });
    const categories = await user?.getCategories();
    const categoryForCategory = categories.filter(
      (item: { category_id: string; values: any[] }) =>
        item.category_id === category &&
        item.values.find((item: { id: string }) => item.id === value)
    );
    if (!categoryForCategory)
      return res
        .status(400)
        .json({ error: true, message: "No se encontró la categoría" });
    const variations = await user?.getVariations().then((res: any[]) => {
      return res.filter(
        (variation: { category_id: string; category_value: string }) =>
          variation.category_id === category &&
          variation.category_value === value
      );
    });
    if (!variations)
      return res
        .status(400)
        .json({ error: true, message: "No se encontraron variaciones" });

    return res.status(200).json({ variations, hola: "hola" });
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    return res
      .status(500)
      .json({ error: "No se pudo obtener la lista de productos" });
  }
};

export const getVariationById = async (req: Request, res: Response) => {
  const variationId = req.params.id;
  const userId = req.body.user_id;

  try {
    const user = await User.findByPk(userId);
    if (!user)
      return res
        .status(400)
        .json({ error: true, message: "User no registrado" });
    if (!userId)
      return res
        .status(400)
        .json({ error: true, message: "Usuario no registrado" });
    const userVariations = await user.getVariations();
    if (!userVariations)
      return res
        .status(400)
        .json({ error: true, message: "No se encontró ninguna variación " });
    const variationSelected = userVariations.filter(
      (variation: { variation_id: string }) =>
        variation.variation_id === variationId
    );
    if (!variationSelected)
      return res
        .status(400)
        .json({ error: true, message: "No se encontró ninguna variación " });
    return res.status(200).json(variationSelected);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al buscar el producto", error: error });
  }
};
