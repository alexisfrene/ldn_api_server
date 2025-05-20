import { models } from "@lib/sequelize";

const { Expense } = models;

export const deleteExpenseService = async (id: string) => {
  const expense = await Expense.findByPk(id);
  if (!expense) return { status: 404, body: { error: "Gasto no encontrado" } };

  await expense.destroy();
  return { status: 204, body: { message: "Gasto eliminado correctamente" } };
};
