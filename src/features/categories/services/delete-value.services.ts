import { deleteFromMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const { Category, User } = models;

export const deleteCategoryValueService = async (
  user_id: string,
  category_id: string,
  category_value: string,
) => {
  if (!category_id || !category_value || !user_id) {
    return {
      status: 400,
      body: {
        error: true,
        message: "Faltan datos: category_id, value_id o user_id",
      },
    };
  }

  const categorySelected = await Category.findByPk(category_id);
  if (!categorySelected) {
    return {
      status: 404,
      body: {
        error: true,
        message: "Categoría no encontrada",
      },
    };
  }

  const deleteValue = categorySelected.values.find(
    (value: { id: string }) => value.id === category_value,
  );

  if (!deleteValue) {
    return {
      status: 404,
      body: {
        error: true,
        message: "Valor de categoría no encontrado",
      },
    };
  }

  const newValues = categorySelected.values.filter(
    (value: { id: string }) => value.id !== category_value,
  );

  const user = await User.findByPk(user_id);
  if (user) {
    const userProducts = await user.getUserProducts({
      where: { category_id, category_value },
    });

    await Promise.all(
      userProducts.map((product: any) =>
        product.update({ category_value: null }),
      ),
    );
  }

  if (deleteValue.icon_url) {
    await deleteFromMinio(deleteValue.icon_url, `${user_id}/categories`);
  }

  const updatedCategory = await categorySelected.update({
    values: newValues,
  });

  return {
    status: 200,
    body: {
      message: "Valor eliminado correctamente",
      data: updatedCategory,
    },
  };
};
