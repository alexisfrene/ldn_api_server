import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";
const { Expense } = models;

export const createExpense = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { description, name } = req.body;

  const expense = await Expense.create({
    description,
    name,
    user_id: user_id as Uuid,
  });

  res.status(201).json(expense);
};
