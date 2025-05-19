import { models } from "@lib/sequelize";

const Category = models.Category;

export const modifyTitleCollectionCategoryService = async (
  user_id: string,
  category_id: string,
  title: string,
) => {
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "Usuario no autorizado" },
    };
  if (!category_id)
    return {
      status: 400,
      body: { error: true, message: "No se proporciono un id de categoría" },
    };
  const categorySelected = await Category.findByPk(category_id);
  if (!categorySelected)
    return {
      status: 400,
      body: { error: true, message: "No se encontró la categoría" },
    };
  const updateCategory = await categorySelected.update({ title });
  return { status: 200, body: updateCategory };
};
