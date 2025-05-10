import { Request, Response } from "express";
import { models } from "@lib";
import { env } from "config/environment";

const User = models.User;

export const getByIdValueImageURL = async (req: Request, res: Response) => {
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
  const user = await User.findByPk(user_id);
  if (!user || !user.getUserCategories) {
    return res
      .status(400)
      .json({ error: true, message: "El usuario no tiene categorías" });
  }

  const categories = await user.getUserCategories({
    order: [["category_id", "ASC"]],
  });
  const selectedValue = categories.reduce(
    (foundValue: any, category: { values: any[] }) => {
      return (
        foundValue ||
        category.values.find((value: { id: string }) => value.id === id)
      );
    },
    null
  );

  if (!selectedValue) {
    return res.status(404).json({ error: "Value not found" });
  }

  const url =
    selectedValue.id === "default"
      ? "https://res.cloudinary.com/daxkizsj3/image/upload/v1714359418/default_image.webp"
      : `${env === "production" ? "https" : req.protocol}://${req.get(
          "host"
        )}/api/categories/images/${selectedValue.icon_url.replace(
          /\.[^/.]+$/,
          ""
        )}`;

  return res.status(200).json(url);
};
