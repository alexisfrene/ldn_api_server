import { Request, Response } from "express";
import { db } from "@lib";

const Size = db.Size;

export const modifyTitleCollectionSize = async (
  req: Request,
  res: Response
) => {
  const size_id = req.params.id;
  const user_id = req.user;
  const { title } = req.body;
  if (!user_id)
    return res
      .status(401)
      .json({ error: true, message: "Usuario no autorizado" });
  if (!size_id)
    return res.status(400).json({
      error: true,
      message: "No se proporciono un id del numero/talla",
    });
  const sizeSelected = await Size.findByPk(size_id);
  if (!sizeSelected)
    return res
      .status(400)
      .json({ error: true, message: "No se encontró la numero/talla" });
  const updateSize = await sizeSelected.update({
    title,
  });
  return res.status(200).json(updateSize);
};
