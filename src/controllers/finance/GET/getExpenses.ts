import { Request, Response } from "express";
import { models } from "@lib";

const { Expense, User } = models;

export const getExpenses = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const expenses = user ? await user.getUserExpenses() : [];

  return res.status(200).json(expenses);
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);

  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });

  return res.status(200).json(expense);
};
