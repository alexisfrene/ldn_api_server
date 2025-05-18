import { Request, Response } from "express";
import { models } from "@lib/sequelize";

const { Movement, Installment } = models;

export const deleteMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;

  const movement = await Movement.findByPk(id);

  if (!movement) {
    return res.status(404).json({ message: "Movimiento no encontrado" });
  }

  if (
    movement.type === "money_outflow" &&
    movement.debt_id &&
    movement.installment_id
  ) {
    await Installment.findByPk(movement.installment_id).then((res) =>
      res?.update({ status: "unpaid" }),
    );
  }

  if (movement.user_id !== user_id) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para eliminar este movimiento." });
  }

  await movement.destroy();

  return res.json({ message: "Movimiento eliminado" });
};
