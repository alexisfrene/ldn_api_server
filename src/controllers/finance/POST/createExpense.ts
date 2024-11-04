import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";
const { Expense, Tag } = models;

export const createExpense = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { description, name } = req.body;

  const expense = await Expense.create({
    description,
    user_id: user_id as Uuid,
  });
  await Tag.create({
    expense_id: expense.expense_id,
    name,
    type: "expense",
    user_id: user_id as Uuid,
  });
  return res.status(201).json(expense);
};
