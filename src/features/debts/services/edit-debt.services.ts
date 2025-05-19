import { models } from "@lib/sequelize";

const { Debt } = models;

export const editDebtService = async (debt_id: string, body: any) => {
  const debtSelected = await Debt.findByPk(debt_id);
  if (!debtSelected)
    return { error: true, message: "No se encontró la deuda seleccionada !" };
  await debtSelected.update({
    name: body.name,
    notes: body.notes,
    minimum_payment: body.minimum_payment,
    money_to_receive: body.money_to_receive,
    payment_frequency: body.payment_frequency,
    total_debt: body.total_debt,
  });
  return { ok: true };
};
