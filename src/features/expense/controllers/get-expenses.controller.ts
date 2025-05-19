import { Request, Response } from "express";
import {
  getExpenseByIdService,
  getExpensesService,
} from "../services/get-expenses.services";

export const getExpenses = async (req: Request, res: Response) => {
  const userId = req.user;
  const result = await getExpensesService(userId);
  return res.status(result.status).json(result.body);
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const result = await getExpenseByIdService(expense_id);
  return res.status(result.status).json(result.body);
};
