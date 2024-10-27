import { Request, Response } from "express";
import { models } from "@lib";
const { Expense } = models;

export const getExpenses = async (_req: Request, res: Response) => {
  const expenses = await Expense.findAll();
  return res.status(200).json(expenses);
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);
  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });
  return res.status(200).json(expense);
};
