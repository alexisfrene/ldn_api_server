import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { getSecureUrl } from "../../../lib";

const User = db.User;

export const getAllCategories = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    if (!user_id) return res.status(401).json({ error: "No authority" });
    const user = await User.findByPk(user_id);
    if (!user?.getCategories)
      return res
        .status(400)
        .json({ error: true, message: "El usuario no tiene categorías" });
    const categories = await user?.getCategories();
    const formatterCategories = categories.map(
      (category: {
        values: { icon_url: string; value: string; id: string }[];
        title: any;
        category_id: any;
      }) => {
        const values = category.values.map(
          (value: { icon_url: string; value: string; id: string }) => {
            return {
              icon_url: getSecureUrl(value.icon_url, user_id),
              value: value.value,
              id: value.id,
            };
          }
        );
        return {
          title: category.title,
          values,
          category_id: category.category_id,
        };
      }
    );
    return res.status(200).json(formatterCategories);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};

export const getByIdCategory = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const { id } = req.params;
  try {
    if (!user_id) return res.status(401).json({ error: "No authority" });
    if (!id)
      return res
        .status(400)
        .json({ error: "No se proporciono un id para buscar una categoría" });
    const user = await User.findByPk(user_id);
    const categories = await user.getCategories();
    const selectedCategory = await categories.find(
      (category: { category_id: string }) => category.category_id === id
    );

    return res.status(200).json(selectedCategory);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};

export const getByIdCategoryValue = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const { id } = req.params;
  try {
    if (!user_id) return res.status(401).json({ error: "No authority" });
    if (!id)
      return res
        .status(400)
        .json({ error: "No se proporciono un id para buscar una categoría" });
    const user = await User.findByPk(user_id);
    const categories = await user.getCategories();
    const selectedValue = categories.reduce(
      (foundValue: any, category: { values: any[] }) => {
        return (
          foundValue ||
          category.values.find((value: { id: string }) => value.id === id)
        );
      },
      null
    );

    return res.status(200).json(selectedValue);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};

export const getByIdValueImageURL = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const { id } = req.params;
  try {
    if (!user_id) return res.status(401).json({ error: "No authority" });
    if (!id)
      return res
        .status(400)
        .json({ error: "No se proporciono un id para buscar una categoría" });
    const user = await User.findByPk(user_id);
    const categories = await user.getCategories();
    const selectedValue = categories.reduce(
      (foundValue: any, category: { values: any[] }) => {
        return (
          foundValue ||
          category.values.find((value: { id: string }) => value.id === id)
        );
      },
      null
    );

    const url = getSecureUrl(selectedValue.icon_url, user_id);

    return res.status(200).json(url);
  } catch (error) {
    return res.status(501).json({ message: error });
  }
};
