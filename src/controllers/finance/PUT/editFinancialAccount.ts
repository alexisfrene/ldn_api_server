import { Request, Response } from "express";
import { db } from "@lib";

const FinancialAccounts = db.FinancialAccount;

export const editFinancialAccount = async (req: Request, res: Response) => {
  const { financial_accounts_id } = req.params;
  const { name, type, values } = req.body;
  const user_id = req.user;

  const financialAccount = await FinancialAccounts.findByPk(
    financial_accounts_id
  );

  if (!financialAccount) {
    return res.status(404).json({ message: "Cuenta financiera no encontrada" });
  }

  if (financialAccount.user_id !== user_id) {
    return res.status(403).json({
      message: "No tienes permiso para editar esta cuenta financiera.",
    });
  }

  financialAccount.name = name || financialAccount.name;
  financialAccount.type = type || financialAccount.type;
  financialAccount.values = values || financialAccount.values;

  await financialAccount.save();

  return res.json({
    message: "Cuenta financiera actualizada",
    financialAccount,
  });
};
