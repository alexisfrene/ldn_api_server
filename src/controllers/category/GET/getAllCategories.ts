import { Request, Response } from "express";
import { getSecureUrl, db } from "../../../lib";

const User = db.User;

export const getAllCategories = async (req: Request, res: Response) => {
  const user_id = req.user;

  if (!user_id) {
    return res.status(401).json({ error: "No authority" });
  }

  const user = await User.findByPk(user_id);

  const categories = await user.getUserCategories({
    order: [["category_id", "ASC"]],
  });

  const formatterCategories = categories.map(
    (category: {
      values: { icon_url: string; value: string; id: string }[];
      title: any;
      category_id: any;
    }) => {
      const values = category.values.map(
        (value: { icon_url: string; value: string; id: string }) => {
          return {
            icon_url:
              value.id === "default"
                ? "https://res.cloudinary.com/daxkizsj3/image/upload/v1714359418/default_image.webp"
                : getSecureUrl(value.icon_url, user_id),
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
};
