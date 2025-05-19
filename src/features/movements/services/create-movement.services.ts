import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { Movement, Debt, Installment } = models;

export const createMovementService = async (user_id: string, body: any) => {
  const {
    label,
    value,
    type,
    payment_method_id,
    financial_accounts_id,
    entry_date,
    debt_id,
    installment_id,
    expense_id,
  } = body;
  const date = entry_date?.split("-");
  if (type === "debt") {
    const installmentsSelect = await Debt.findByPk(debt_id).then((res) =>
      res?.getDebtInstallments(),
    );
    const filterInstallment = installmentsSelect?.find(
      (e) => e.installment_id === installment_id,
    );
    const installmentUpdate = await Installment.findByPk(
      filterInstallment?.installment_id,
    );
    await installmentUpdate?.update({ status: "paid" });

    const newMovement = await Movement.create({
      label,
      value: filterInstallment?.amount || 1,
      type: "money_outflow",
      payment_method_id,
      financial_accounts_id,
      user_id: user_id as Uuid,
      entry_date: new Date(date[0], date[1] - 1, date[2], 12),
      expense_id: expense_id || null,
      debt_id: debt_id || null,
      installment_id: installment_id || null,
    });

    return { status: 200, body: { newMovement, filterInstallment } };
  }
  const newMovement = await Movement.create({
    label,
    value,
    type,
    payment_method_id,
    financial_accounts_id,
    user_id: user_id as Uuid,
    entry_date: new Date(date[0], date[1] - 1, date[2], 12),
    expense_id: expense_id || null,
  });

  return { status: 200, body: { newMovement } };
};
