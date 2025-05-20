import { models } from "@lib/sequelize";

const User = models.User;

export const getByIdCategoryService = async (user_id: string, id: string) => {
  if (!user_id) {
    return { status: 401, body: { error: "No authority" } };
  }
  if (!id) {
    return {
      status: 400,
      body: { error: "No se proporcionó un id para buscar una categoría" },
    };
  }

  try {
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
    const selectedCategory = categories.find(
      (category) => category.category_id === Number(id),
    );

    return { status: 200, body: selectedCategory };
  } catch (error) {
    return {
      status: 500,
      body: { message: "Internal server error", error: true },
    };
  }
};
