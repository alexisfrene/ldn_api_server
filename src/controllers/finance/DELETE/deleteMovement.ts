import { Request, Response } from "express";
import { db } from "../../../lib";

const Movements = db.Movement;

export const deleteMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;

  const movement = await Movements.findByPk(id);

  if (!movement) {
    return res.status(404).json({ message: "Movimiento no encontrado" });
  }

  if (movement.user_id !== user_id) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para eliminar este movimiento." });
  }

  await movement.destroy();

  return res.json({ message: "Movimiento eliminado" });
};
