import { models } from "@lib/sequelize";

const User = models.User;

export const getVariationForCategoryService = async (
  user_id: string,
  category: string,
  value: string,
) => {
  if (!user_id) return { status: 401, body: { error: "No authority" } };
  const user = await User.findByPk(user_id);
  if (!user)
    return { status: 400, body: { error: true, message: "No autorizado" } };
  if (!category || !value)
    return {
      status: 400,
      body: { error: true, message: "No se paso los parámetros esperados" },
    };
  const categories = await user?.getUserCategories();

  const categoryForCategory = categories.filter(
    (item) =>
      item.category_id === Number(category) &&
      item.values.find((item: { id: string }) => item.id === value),
  );
  if (!categoryForCategory.length)
    return {
      status: 400,
      body: { error: true, message: "No se encontró la categoría" },
    };
  const variations = await user?.getUserVariations().then((res: any[]) => {
    return res.filter(
      (variation) =>
        variation.category_id === category &&
        variation.category_value === value,
    );
  });
  if (!variations?.length)
    return {
      status: 400,
      body: { error: true, message: "No se encontraron variaciones" },
    };

  return { status: 200, body: { variations } };
};
