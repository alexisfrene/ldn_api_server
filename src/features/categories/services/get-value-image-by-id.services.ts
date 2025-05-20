import { env } from "config/environment";
import { models } from "@lib/sequelize";

const User = models.User;

export const getByIdValueImageURLService = async (
  user_id: string,
  id: string,
  req: any,
) => {
  if (!user_id) {
    return { status: 401, body: { error: "No authority" } };
  }
  if (!id) {
    return {
      status: 400,
      body: { error: "No se proporcionó un id para buscar una categoría" },
    };
  }
  const user = await User.findByPk(user_id);
  if (!user || !user.getUserCategories) {
    return {
      status: 400,
      body: { error: true, message: "El usuario no tiene categorías" },
    };
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
    null,
  );

  if (!selectedValue) {
    return { status: 404, body: { error: "Value not found" } };
  }

  const url =
    selectedValue.id === "default"
      ? "https://res.cloudinary.com/daxkizsj3/image/upload/v1714359418/default_image.webp"
      : `${env === "production" ? "https" : req.protocol}://${req.get(
          "host",
        )}/api/categories/images/${selectedValue.icon_url.replace(
          /\.[^/.]+$/,
          "",
        )}`;

  return { status: 200, body: url };
};
