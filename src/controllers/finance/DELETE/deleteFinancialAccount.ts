import { Request, Response } from "express";
import { models } from "@lib/sequelize";

const { FinancialAccount } = models;

export const deleteFinancialAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;

  const financialAccount = await FinancialAccount.findByPk(id);

  if (!financialAccount) {
    return res.status(404).json({
      message: "Cuenta financiera no encontrada",
      id,
    });
  }

  if (financialAccount.user_id !== user_id) {
    return res.status(403).json({
      message: "No tienes permiso para eliminar esta cuenta financiera.",
    });
  }

  await financialAccount.destroy();

  return res.json({ message: "Cuenta financiera eliminada" });
};
