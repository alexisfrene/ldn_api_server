import { models } from "@lib";
import { Request, Response } from "express";
import { Uuid } from "types";
const { Debt, Installment } = models;

export const createDebts = async (req: Request, res: Response) => {
  const newDebts = await Debt.create({
    notes: req.body.notes || "Sin nota",
    name: req.body.name || "Sin nombre",
    total_debt: req.body.total_debt || 1,
    current_quota: req.body.current_quota || 1,
    minimum_payment: req.body.minimum_payment || 1,
    payment_frequency: req.body.payment_frequency || "monthly",
    interest_rate: req.body.interest_rate || 0,
    user_id: req.user as Uuid,
  });
  const promiseInstallment = req.body.installments.map(
    async (installment: {
      amount: number;
      due_date: Date;
      status: "paid" | "unpaid";
    }) =>
      Installment.create({
        amount: installment.amount,
        due_date: new Date(installment.due_date),
        status: installment.status,
        debt_id: newDebts.debt_id,
      })
  );
  await Promise.all(promiseInstallment);
  return res.status(200).json({});
};
