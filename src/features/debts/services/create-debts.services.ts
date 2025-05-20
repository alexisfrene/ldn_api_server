import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { Debt, Installment } = models;

export const createDebtsService = async (user_id: Uuid, body: any) => {
  const total_debt = body.installments.reduce(
    (sum: number, installment: { amount: number }) => sum + installment.amount,
    0,
  );

  const totalInterest =
    ((total_debt - body.money_to_receive) / body.money_to_receive) * 100;

  const effectiveInterestPerInstallment =
    (Math.pow(
      total_debt / body.money_to_receive,
      1 / body.installments.length,
    ) -
      1) *
    100;

  const newDebts = await Debt.create({
    notes: body.notes || "Sin nota",
    name: body.name || "Sin nombre",
    total_debt: total_debt || 1,
    minimum_payment: body.minimum_payment || 1,
    payment_frequency: body.payment_frequency || "monthly",
    total_interest: totalInterest || 0,
    interest_per_installment: effectiveInterestPerInstallment || 0,
    money_to_receive: body.money_to_receive || 0,
    user_id,
  });

  const promiseInstallment = body.installments.map(
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
      }),
  );
  await Promise.all(promiseInstallment);
  return {};
};
