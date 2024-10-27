import { models } from "@lib";
import { Request, Response } from "express";
const { Expense } = models;
export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, transaction_date, financial_accounts_id } =
    req.body;
  const expense = await Expense.findByPk(id);
  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });

  await expense.update({
    description,
    amount,
    transaction_date,
    financial_accounts_id,
  });
  return res.status(200).json(expense);
};
