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
        order: [
          ["due_date", "ASC"],
          ["installment_id", "DESC"],
        ],
      });
      let totalPaid = 0;
      let totalUnpaid = 0;
      if (installments.length) {
        installments.forEach((installment) => {
          if (installment.status === "paid") {
            totalPaid += installment.amount;
          } else if (installment.status === "unpaid") {
            totalUnpaid += installment.amount;
          }
        });
      }

      return {
        name: debt.name,
        total: totalPaid + totalUnpaid,
        total_paid: totalPaid,
        total_interest: debt.total_interest,
        interest_per_installment: debt.interest_per_installment,
        total_unpaid: totalUnpaid,
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
  const debt = await Debt.findByPk(id, {
    raw: true,
    attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
  });

  if (!debt) return res.status(404).json({ error: "Gasto no encontrado" });
  const installments = await Installment.findAll({
    where: { debt_id: debt.debt_id },
    attributes: ["installment_id", "amount", "due_date", "status"],
    order: [["due_date", "ASC"]],
  });

  return res.status(200).json({
    ...debt,
    installments: installments || [],
  });
};
