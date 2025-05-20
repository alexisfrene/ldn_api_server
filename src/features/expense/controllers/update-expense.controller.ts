import { Request, Response } from "express";
import { updateExpenseService } from "../services/update-expense.services";

export const updateExpense = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const result = await updateExpenseService(expense_id, req.body);
  return res.status(result.status).json(result.body);
};
