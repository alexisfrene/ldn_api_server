import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const { Movement, Debt, Installment } = models;

export const createMovement = async (req: Request, res: Response) => {
  const user_id = req.user;
  const {
    label,
    value,
    type,
    payment_method_id,
    financial_accounts_id,
    entry_date,
  } = req.body;
  const date = entry_date?.split("-");
  if (type === "debt") {
    const installmentsSelect = await Debt.findByPk(req.body?.debt_id).then(
      (res) => res?.getDebtInstallments()
    );
    const filterInstallment = installmentsSelect?.find(
      (e) => e.installment_id === req.body.installment_id
    );
    const installmentUpdate = await Installment.findByPk(
      filterInstallment?.installment_id
    );
    installmentUpdate?.update({ status: "paid" });

    const newMovement = await Movement.create({
      label,
      value: filterInstallment?.amount || 1,
      type: "money_outflow",
      payment_method_id: payment_method_id,
      financial_accounts_id,
      user_id: user_id as Uuid,
      entry_date: new Date(date[0], date[1] - 1, date[2], 12),
      expense_id: req.body?.expense_id || null,
      debt_id: req.body?.debt_id || null,
      installment_id: req.body?.installment_id || null,
    });

    return res.status(200).json({ newMovement, filterInstallment });
  }
  const newMovement = await Movement.create({
    label,
    value,
    type,
    payment_method_id: payment_method_id,
    financial_accounts_id,
    user_id: user_id as Uuid,
    entry_date: new Date(date[0], date[1] - 1, date[2], 12),
    expense_id: req.body?.expense_id || null,
  });

  return res.status(200).json({ newMovement });
};
