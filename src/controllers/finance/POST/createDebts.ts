import { models } from "@lib";
import { Request, Response } from "express";
const { Debt, Installment } = models;

export const createDebts = async (req: Request, res: Response) => {
  const newDebts = await Debt.create({
    notes: "Sin nota",
    name: "-",
    total_debt: 0,
    current_quota: 1,
    minimum_payment: 1,
  });
  const promiseInstallment = req.body.installments.map(
    async (installment: {
      amount: number;
      due_date: Date;
      status: "paid" | "unpaid";
    }) =>
      Installment.create({
        amount: installment.amount,
        due_date: installment.due_date,
        status: installment.status,
        debt_id: newDebts.debt_id,
      })
  );
  await Promise.all(promiseInstallment);
  return res.status(200).json({});
};
