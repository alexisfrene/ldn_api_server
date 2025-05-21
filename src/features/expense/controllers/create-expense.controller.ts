import { Request, Response } from "express";
import { createExpenseService } from "@expense-services/create-expense.services";
import { Uuid } from "types";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const user_id = req.user as Uuid;
    const body = req.body;
    const result = await createExpenseService(user_id, body);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Error creating expense:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
