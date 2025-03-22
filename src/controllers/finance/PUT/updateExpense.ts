import { models } from "@lib";
import { Request, Response } from "express";
const { Expense } = models;
export const updateExpense = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const { description, name } = req.body;
  const expense = await Expense.findByPk(expense_id);
  if (!expense) res.status(404).json({ error: "Gasto no encontrado" });

  await expense!.update({
    description,
    name,
  });
  res.status(200).json(expense);
};
