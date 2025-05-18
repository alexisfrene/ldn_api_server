import { Request, Response } from "express";
import { deleteFromMinio } from "@lib/minio";
import { models } from "@lib/sequelize";

const Category = models.Category;
const User = models.User;

export const deleteCategoryCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const category_id = req.params.id;

  if (!category_id)
    return res
      .status(400)
      .json({ error: true, message: "no se proporciono un category id" });
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "El usuario no esta autentificado" });
  const categorySelected = await Category.findByPk(category_id);

  const userProducts = await User.findByPk(user_id)
    .then((user) => {
      if (user) {
        return user.getUserProducts();
      } else {
        return [];
      }
    })
    .then((products: any[]) =>
      products.filter((product) => product.category_id === category_id),
    );
  if (userProducts) {
    userProducts.forEach(async (product: any) => {
      await product.update({ category_value: null, category_id: null });
    });
  }
  if (categorySelected) {
    categorySelected.values.forEach(async (value: { icon_url: any }) => {
      await deleteFromMinio(value.icon_url, `${user_id}/categories`);
    });

    const destroyCategory = await categorySelected.destroy();
    return res.status(200).json({ message: destroyCategory });
  }

  return res
    .status(400)
    .json({ error: true, message: "no se pudo eliminar la categoría" });
};
