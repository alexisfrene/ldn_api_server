import { Request, Response } from "express";
import {
  getExpenseByIdService,
  getExpensesService,
} from "@expense-services/get-expenses.services";

export const getExpenses = async (req: Request, res: Response) => {
  const userId = req.user;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await getExpensesService(userId, page, limit);
  return res.status(result.status).json(result.body);
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const result = await getExpenseByIdService(expense_id);
  return res.status(result.status).json(result.body);
};
