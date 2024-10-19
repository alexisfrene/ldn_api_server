import { Request, Response } from "express";
import { db } from "../../../lib";
import { formatDate } from "../../../utils";

const FinancialAccounts = db.FinancialAccounts;
const Debts = db.Debts;
const Installments = db.Installments;

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name, type } = req.body;

  if (type === "debt") {
    const newFinancialAccounts = await FinancialAccounts.create({
      name,
      type,
      user_id,
    });
    const newDebts = await Debts.create({
      financial_accounts_id: newFinancialAccounts.financial_accounts_id,
      notes: req.body.note || "-",
    });

    //   req.body.installments_data.map()

    const newInstallments = await Installments.create({
      amount: 0.0,
      due_date: formatDate(),
      debt_id: newDebts.debt_id,
    });

    return res.status(200).json(newInstallments);
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
