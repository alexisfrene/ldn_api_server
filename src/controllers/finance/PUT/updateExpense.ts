import { models } from "@lib";
import { Request, Response } from "express";
const { Expense } = models;
export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;
  const expense = await Expense.findByPk(id);
  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });

  await expense.update({
    description,
  });
  return res.status(200).json(expense);
};
