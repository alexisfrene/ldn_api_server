import { models } from "@lib/sequelize";

const User = models.User;

export const getByIdCategoryValueService = async (
  user_id: string,
  id: string,
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
  return { status: 200, body: selectedValue };
};
