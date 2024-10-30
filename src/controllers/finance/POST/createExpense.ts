import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";
const { Expense, FinancialAccount, Tag } = models;

export const createExpense = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { description, name } = req.body;
  const newFinancialAccount = await FinancialAccount.create({
    name,
    user_id: user_id as Uuid,
  });

  const expense = await Expense.create({
    description,
    financial_accounts_id: newFinancialAccount.financial_accounts_id,
  });
  await Tag.create({
    expense_id: expense.expense_id,
    name,
    type: "expense",
    user_id: user_id as Uuid,
  });
  return res.status(201).json(expense);
};
