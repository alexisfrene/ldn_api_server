import { deleteFromMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Category = models.Category;
const User = models.User;

export const deleteCategoryCollectionService = async (
  user_id: string,
  category_id: string,
) => {
  if (!category_id)
    return {
      status: 400,
      body: { error: true, message: "no se proporciono un category id" },
    };
  if (!user_id)
    return {
      status: 401,
      body: { error: true, message: "El usuario no esta autentificado" },
    };

  const categorySelected = await Category.findByPk(category_id);

  const userProducts = await User.findByPk(user_id)
    .then((user) => (user ? user.getUserProducts() : []))
    .then((products: any[]) =>
      products.filter((product) => product.category_id === category_id),
    );
  if (userProducts) {
    await Promise.all(
      userProducts.map((product: any) =>
        product.update({ category_value: null, category_id: null }),
      ),
    );
  }
  if (categorySelected) {
    await Promise.all(
      categorySelected.values.map(async (value: { icon_url: any }) => {
        await deleteFromMinio(value.icon_url, `${user_id}/categories`);
      }),
    );

    const destroyCategory = await categorySelected.destroy();
    return { status: 200, body: { message: destroyCategory } };
  }

  return {
    status: 400,
    body: { error: true, message: "no se pudo eliminar la categoría" },
  };
};
