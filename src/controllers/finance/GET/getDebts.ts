import { Request, Response } from "express";
import { models } from "@lib";

const { Debt, User, Installment } = models;

export const getAllDebts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const debts = user ? await user.getUserDebts() : [];
  const formatterDebts = await Promise.all(
    debts.map(async (debt) => {
      const installments = await Installment.findAll({
        where: { debt_id: debt.debt_id },
        attributes: ["installment_id", "amount", "due_date", "status"],
        order: [["due_date", "ASC"]],
      });
      return {
        name: debt.name,
        debt_id: debt.debt_id,
        notes: debt.notes,
        installments: installments || [],
      };
    })
  );

  return res.status(200).json(formatterDebts);
};

export const getDebtsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = await Debt.findByPk(id);

  if (!expense) return res.status(404).json({ error: "Gasto no encontrado" });

  return res.status(200).json(expense);
};
