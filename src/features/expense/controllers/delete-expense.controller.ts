import { Request, Response } from "express";
import { deleteExpenseService } from "../services/delete-expense.services";

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteExpenseService(id);
  return res.status(result.status).json(result.body);
};
