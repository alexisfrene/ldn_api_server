import { Request, Response } from "express";
import { models } from "@lib";
const { Expense } = models;

// Eliminar un gasto
export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);
  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });

  await expense.destroy();
  return res.status(204).json({ message: "Gasto eliminado correctamente" });
};
