import { Request, Response } from "express";
import { db } from "../../../lib";
//import { formatDate } from "../../../utils";

const FinancialAccounts = db.FinancialAccount;
//const Debts = db.Debts;
//const Installments = db.Installments;

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name, type } = req.body;
  console.log({ data: req.body });
  if (type === "debts") {
    const newFinancialAccounts = await FinancialAccounts.create({
      name,
      type,
      user_id,
    });
    // const newDebts = await Debts.create({
    //   financial_accounts_id: newFinancialAccounts.financial_accounts_id,
    //   notes: req.body.note || "-",
    //   // interest_rate: req.body.interest_rate,
    //   //minimum_payment: req.body.minimum_payment,
    //   total_debt: Number(req.body.total_debt),
    //   payment_frequency: req.body.payment_frequency,
    //   current_quota: req.body.current_quota,
    // });

    // if (Array.isArray(req.body.installments)) {
    //   const createInstallments = req.body.installments.map(
    //     (installment: { amount: number; due_date: string | undefined }) => {
    //       return Installments.create({
    //         amount: Number(installment.amount),
    //         due_date: new Date(),
    //         status: "unpaid",
    //         debt_id: newDebts.debt_id,
    //       });
    //     }
    //   );

    //   const newInstallments = await Promise.all(createInstallments);
    return res.status(200).json({ newFinancialAccounts });
    // }
  }

  if (type === "inflow_of_money" || type === "money_outflow") {
    const newFinancialAccounts = await FinancialAccounts.create({
      name,
      type,
      user_id,
    });
    return res.status(200).json(newFinancialAccounts);
  } else {
    return res
      .status(400)
      .json({ message: "Error al crear una cuenta financiera", error: true });
  }
};
