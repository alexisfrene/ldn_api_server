import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { models } from "@lib";
import { Uuid } from "types";

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
      (size: { size_id: string }) => size.size_id === size_id
    );
    if (!validateExistSize)
      return res
        .status(400)
        .json({ error: true, message: "La categoría no existe en el usuario" });
    const selectedSize = await Size.findByPk(size_id);
    if (selectedSize) {
      const validateRepeatValue = selectedSize.values.find(
        (e: { value: string }) => e.value === value
      );
      if (validateRepeatValue)
        return res.status(400).json({
          error: true,
          message: `Èl valor ( ${value} , ya esta cargado )`,
        });
      const newValue = {
        id: uuidv4() as Uuid,
        value,
      };
      const updateSize = await selectedSize.update({
        values: [...selectedSize.values, newValue],
      });

      return res.status(200).json(updateSize);
    }
  }

  return res
    .status(400)
    .json({ error: true, message: "Error al agregar un valor a tallas" });
};
