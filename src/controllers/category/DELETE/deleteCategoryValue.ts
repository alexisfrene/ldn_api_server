import { Request, Response } from "express";
import { models, deleteImageToCloudinary } from "@lib";

const Category = models.Category;
const User = models.User;

export const deleteCategoryValue = async (req: Request, res: Response) => {
  const user_id = req.user;
  const category_id = req.params.id;
  const category_value = req.query.value_id;
  if (!category_id)
    return res
      .status(400)
      .json({ error: true, message: "no se proporciono un category id" });
  if (!category_value)
    return res.status(400).json({
      error: true,
      message: "no se proporciono un category value id",
    });
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "El usuario no esta autentificado" });
  const categorySelected = await Category.findByPk(category_id);
  const deleteValue = categorySelected?.values.find(
    (value: { id: string }) => value.id === category_value
  );
  const newValues = categorySelected?.values.filter(
    (value: { id: string }) => value.id !== category_value
  );

  const userProducts = await User.findByPk(user_id)
    .then((user) => {
      if (user) {
        return user.getUserProducts();
      } else {
        return [];
      }
    })
    .then((products: any[]) =>
      products.filter(
        (product: { category_id: string; category_value: string }) =>
          product.category_id === category_id &&
          product.category_value === category_value
      )
    );
  if (userProducts) {
    userProducts.forEach(async (product: any) => {
      await product.update({ category_value: null });
    });
  }

  await deleteImageToCloudinary(`${user_id}/${deleteValue?.icon_url || ""}`);
  if (categorySelected) {
    const newValuesInCategory = await categorySelected.update({
      values: newValues,
    });
    return res.status(200).json({ message: newValuesInCategory });
  }
  return res
    .status(400)
    .json({ error: true, message: "no se proporciono un category id" });
};
