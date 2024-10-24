import { Request, Response } from "express";
import { models } from "@lib";

const FinancialAccounts = models.FinancialAccount;

export const deleteFinancialAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user;

  const financialAccount = await FinancialAccounts.findByPk(id);

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
