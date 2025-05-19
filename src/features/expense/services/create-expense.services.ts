import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { Expense } = models;

export const createExpenseService = async (user_id: Uuid, body: any) => {
  if (!body?.name) {
    return { status: 400, body: { message: "Name is required." } };
  }

  const expense = await Expense.create({
    name: body?.name,
    description: body?.description || "-",
    user_id,
  });

  return { status: 201, body: expense };
};
