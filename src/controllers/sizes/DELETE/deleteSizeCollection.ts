import { Request, Response } from "express";
import { db } from "../../../lib";

const Size = db.Size;
const User = db.User;

export const deleteSizeCollection = async (req: Request, res: Response) => {
  const user_id = req.user;
  const size_id = req.params.id;
  if (!size_id)
    return res
      .status(400)
      .json({ error: true, message: "no se proporciono un size id" });
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "El usuario no esta autentificado" });
  const sizeSelected = await Size.findByPk(size_id);
  const userProducts = await User.findByPk(user_id)
    .then((user: { getUserProducts: () => any }) => user.getUserProducts())
    .then((products: any[]) =>
      products.filter(
        (product: { size_id: string; size_value: string }) =>
          product.size_id === size_id
      )
    );
  if (userProducts) {
    userProducts.forEach(async (product: any) => {
      await product.update({ size_value: null, size_id: null });
    });
  }
  const destroySize = await sizeSelected.destroy();

  return res.status(200).json({ message: destroySize });
};
