import { Request, Response } from "express";
import { models } from "@lib";
const { Expense } = models;
// Crear un nuevo gasto
export const createExpense = async (req: Request, res: Response) => {
  const { description, amount, transaction_date, financial_accounts_id } =
    req.body;
  const expense = await Expense.create({
    description,
    amount,
    transaction_date,
    financial_accounts_id,
  });
  return res.status(201).json(expense);
};
