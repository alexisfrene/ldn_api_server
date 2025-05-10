import { Request, Response } from "express";
import { Uuid } from "types";
import { models } from "@lib";

const { Expense } = models;

export const createExpense = async (req: Request, res: Response) => {
  try {
    const user_id = req.user as Uuid;
    const body = req.body;

    if (!body?.name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const expense = await Expense.create({
      name: body?.name,
      description: body?.description || "-",
      user_id,
    });

    return res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
