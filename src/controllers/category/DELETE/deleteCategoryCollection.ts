import { Request, Response } from "express";
import { db, deleteImageToCloudinary } from "../../../lib";

const Category = db.Category;
const User = db.User;

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
    .then((user: { getProducts: () => any }) => user.getProducts())
    .then((products: any[]) =>
      products.filter(
        (product: { category_id: string; category_value: string }) =>
          product.category_id === category_id
      )
    );
  if (userProducts) {
    userProducts.forEach(async (product: any) => {
      await product.update({ category_value: null, category_id: null });
    });
  }
  categorySelected.values.forEach(async (value: { icon_url: any }) => {
    await deleteImageToCloudinary(`${user_id}/${value.icon_url}`);
  });

  const destroyCategory = await categorySelected.destroy();

  return res.status(200).json({ message: destroyCategory });
};
