import { Uuid } from "types";
import { models } from "@lib/sequelize";

const User = models.User;
const Category = models.Category;

export const getProductForCategoryService = async (
  user_id: string,
  category_id: string,
  category_value: string,
) => {
  const user = await User.findByPk(user_id || "");
  const products = user?.getUserProducts ? await user.getUserProducts() : [];
  if (!products)
    return {
      status: 400,
      body: { error: true, message: "El usuario no tiene productos cargados" },
    };
  const category = await Category.findByPk((category_id as Uuid) || "");
  if (!category)
    return {
      status: 400,
      body: { error: true, message: "Categoría no encontrado" },
    };
  const categoryValue = category?.values.find(
    (value: { id: string }) => value.id === category_value,
  );
  if (!categoryValue)
    return {
      status: 400,
      body: { error: true, message: "No se encontró el valor de la categoría" },
    };
  const productsForCategory = products.filter(
    (product) =>
      product.category_id === Number(category_id) &&
      product.category_value === category_value,
  );
  return { status: 200, body: { res: productsForCategory } };
};
