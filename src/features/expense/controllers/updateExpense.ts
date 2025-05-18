import { Request, Response } from "express";
import { models } from "@lib/sequelize";

const { Expense } = models;
export const updateExpense = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const { description, name } = req.body;
  const expense = await Expense.findByPk(expense_id);
  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });

  await expense.update({
    description,
    name,
  });
  return res.status(200).json(expense);
};
