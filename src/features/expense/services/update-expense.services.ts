import { models } from "@lib/sequelize";

const { Expense } = models;

export const updateExpenseService = async (expense_id: string, body: any) => {
  const { description, name } = body;
  const expense = await Expense.findByPk(expense_id);
  if (!expense) return { status: 404, body: { error: "Gasto no encontrado" } };

  await expense.update({
    description,
    name,
  });
  return { status: 200, body: expense };
};
