import { Request, Response } from "express";
import { models } from "@lib";

const { Movement } = models;

export const editMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { entry_date, label, value, type } = req.body;
  const user_id = req.user;

  const movement = await Movement.findByPk(id);

  if (!movement) {
    res.status(404).json({ message: "Movimiento no encontrado" });
  }

  if (movement!.user_id !== user_id) {
    res
      .status(403)
      .json({ message: "No tienes permiso para editar este movimiento." });
  }

  movement!.entry_date = entry_date || movement!.entry_date;
  movement!.label = label || movement!.label;
  movement!.value = value || movement!.value;
  movement!.type = type || movement!.type;

  await movement!.save();

  res.json({ message: "Movimiento actualizado", movement });
};
