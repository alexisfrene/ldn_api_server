import { Request, Response } from "express";
import { models } from "@lib";
import { env } from "config/environment";
//import { getTemporaryUrl } from "@lib/minio";

const User = models.User;

export const getAllCategories = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ error: "No authority" });
  }

  const user = await User.findByPk(user_id);
  if (user) {
    const categories = await user.getUserCategories({
      order: [["category_id", "ASC"]],
    });

    const formatterCategories = categories.map(category => {
      const values = category.values.map(
        (value: { icon_url: string; value: string; id: string }) => {
          return {
            icon_url:
              value.id === "default"
                ? "https://res.cloudinary.com/daxkizsj3/image/upload/v1714359418/default_image.webp"
                : `${env === "production" ? "https" : req.protocol}://${req.get(
                    "host"
                  )}/api/categories/images/${value.icon_url.replace(
                    /\.[^/.]+$/,
                    ""
                  )}`,
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
    });

    return res.status(200).json(formatterCategories);
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Usuario no encontrado" });
  }
};
