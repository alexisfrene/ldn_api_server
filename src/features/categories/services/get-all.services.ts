import { env } from "config/environment";
import { models } from "@lib/sequelize";

const User = models.User;

export const getAllCategoriesService = async (user_id: string, req: any) => {
  if (!user_id) {
    return { status: 401, body: { error: "No authority" } };
  }

  const user = await User.findByPk(user_id);
  if (user) {
    const categories = await user.getUserCategories({
      order: [["category_id", "ASC"]],
    });

    const formatterCategories = categories.map((category) => {
      const values = category.values.map(
        (value: { icon_url: string; value: string; id: string }) => {
          return {
            icon_url:
              value.id === "default"
                ? "https://res.cloudinary.com/daxkizsj3/image/upload/v1714359418/default_image.webp"
                : `${env === "production" ? "https" : req.protocol}://${req.get(
                    "host",
                  )}/api/categories/images/${value.icon_url.replace(
                    /\.[^/.]+$/,
                    "",
                  )}`,
            value: value.value,
            id: value.id,
          };
        },
      );
      return {
        title: category.title,
        values,
        category_id: category.category_id,
      };
    });

    return { status: 200, body: formatterCategories };
  } else {
    return {
      status: 400,
      body: { error: true, message: "Usuario no encontrado" },
    };
  }
};
