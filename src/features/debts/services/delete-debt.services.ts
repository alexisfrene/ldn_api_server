import { models } from "@lib/sequelize";

const { Debt, Installment, Movement } = models;

export const deleteDebtService = async (debt_id: string) => {
  const debtSelected = await Debt.findByPk(debt_id);
  if (!debtSelected) return { error: "debtSelected no encontrado" };

  const installments = await Installment.findAll({
    where: { debt_id: debtSelected.debt_id },
  });

  const destroysPromise = installments.map(async (installment) => {
    const movementSelected = await Movement.findOne({
      where: { installment_id: installment.installment_id },
    });
    if (movementSelected) {
      await movementSelected.destroy();
    }
    return installment.destroy();
  });

  await Promise.all(destroysPromise);

  await debtSelected.destroy();
  return { message: "Debt eliminado correctamente" };
};
