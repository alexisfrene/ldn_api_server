import { Request, Response } from "express";
import { models } from "@lib";
//import { formatDate } from "../../../utils";

const FinancialAccounts = models.FinancialAccount;
const Debts = models.Debt;
const Installments = models.Installment;

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name, type } = req.body;
  const newFinancialAccount = await FinancialAccounts.create({
    name,
    type,
    user_id,
  });
  if (type === "debt") {
    const newDebts = await Debts.create({
      notes: req.body.notes || "Sin nota",
      total_debt: req.body.total_debt || 0,
      current_quota: req.body.current_quota || 1,
      minimum_payment: req.body.minimum_payment || 1,
      financial_accounts_id: newFinancialAccount.financial_accounts_id,
    });
    const promiseInstallment = req.body.installments.map(
      async (installment: { amount: number; due_date: Date; status: string }) =>
        Installments.create({
          amount: installment.amount,
          due_date: installment.due_date,
          status: installment.status,
          debt_id: newDebts.debt_id,
        })
    );
    await Promise.all(promiseInstallment);
  }
  return res.status(200).json({ newFinancialAccount });
};
