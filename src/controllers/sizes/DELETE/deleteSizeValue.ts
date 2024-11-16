import { Request, Response } from "express";
import { models } from "@lib";

const Size = models.Size;
const User = models.User;

export const deleteSizeValue = async (req: Request, res: Response) => {
  const user_id = req.user;
  const size_id = req.params.id;
  const size_value = req.query.value_id;
  if (!size_id)
    return res
      .status(400)
      .json({ error: true, message: "no se proporciono un size id" });
  if (!size_value)
    return res.status(400).json({
      error: true,
      message: "no se proporciono un size value id",
    });
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "El usuario no esta autentificado" });
  const sizeSelected = await Size.findByPk(size_id);
  const newValues = sizeSelected?.values.filter(
    (value) => value.id !== Number(size_value)
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
        (product: { size_id: string; size_value: string }) =>
          product.size_id === size_id && product.size_value === size_value
      )
    );
  if (userProducts) {
    userProducts.forEach(async (product: any) => {
      await product.update({ size_value: null });
    });
  }

  if (sizeSelected) {
    const newValuesInSize = await sizeSelected.update({
      values: newValues,
    });
    return res.status(200).json({ message: newValuesInSize });
  }
  return res.status(400).json({
    message: "Error al eliminar un valor de tallas",
    error: true,
  });
};
