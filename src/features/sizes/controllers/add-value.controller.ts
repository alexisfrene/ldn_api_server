import { Request, Response } from "express";
import { models } from "@lib";

const Size = models.Size;
const User = models.User;

export const addSizeValue = async (req: Request, res: Response) => {
  const size_id = req.params.id;
  const user_id = req.user;
  const { value }: { value: string } = req.body;
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "Usuario no autorizado" });
  if (!size_id)
    return res
      .status(400)
      .json({ error: true, message: "No se proporciono un id de categoría" });

  const user = await User.findByPk(user_id);
  if (user) {
    const userSizes = await user.getUserSizes();
    const validateExistSize = userSizes.find(
      (size) => size.size_id === Number(size_id),
    );
    if (!validateExistSize)
      return res
        .status(400)
        .json({ error: true, message: "La categoría no existe en el usuario" });
    const selectedSize = await Size.findByPk(size_id);
    if (selectedSize) {
      const validateRepeatValue = selectedSize.values.find(
        (e) => e.value === value,
      );
      if (validateRepeatValue)
        return res.status(400).json({
          error: true,
          message: `Èl valor ( ${value} , ya esta cargado )`,
        });
      const newValue = {
        id: "add-" + selectedSize.values.length++,
        value,
      };

      const formatValues = selectedSize.values.filter(
        (item) => item !== undefined,
      );
      const updateSize = await selectedSize.update({
        values: [...formatValues, newValue],
      });

      return res.status(200).json(updateSize);
    }
  }

  return res
    .status(400)
    .json({ error: true, message: "Error al agregar un valor a tallas" });
};
