import { Request, Response } from "express";
import { models } from "@lib";

const Size = models.Size;
const User = models.User;

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
    .then((user) => {
      if (user) {
        return user.getUserProducts();
      } else {
        return [];
      }
    })
    .then((products) =>
      products.filter((product) => product.size_id === Number(size_id)),
    );
  if (userProducts) {
    userProducts.forEach(async (product: any) => {
      await product.update({ size_value: null, size_id: null });
    });
  }
  if (sizeSelected) {
    const destroySize = await sizeSelected.destroy();

    return res.status(200).json({ message: destroySize });
  }
  return res.status(400).json({
    message: "Error al eliminar una colección de tallas",
    error: true,
  });
};
