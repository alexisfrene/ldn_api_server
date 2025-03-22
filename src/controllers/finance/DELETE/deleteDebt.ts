import { Request, Response } from "express";
import { models } from "@lib";
const { Debt, Installment, Movement } = models;

export const deleteDebt = async (req: Request, res: Response) => {
  const debt_id = req.params.id;
  const debtSelected = await Debt.findByPk(debt_id);
  if (!debtSelected)
    res.status(404).json({ error: "debtSelected no encontrado" });

  const installments = await Installment.findAll({
    where: { debt_id: debtSelected!.debt_id },
  });

  const destroysPromise = installments.map(async (installment) => {
    const movementSelected = await Movement.findOne({
      where: { installment_id: installment.installment_id },
    });
    if (movementSelected) {
      await movementSelected.destroy();
    }
    installment.destroy();
  });

  await Promise.all(destroysPromise);

  await debtSelected!.destroy();
  res.status(204).json({ message: "Debt eliminado correctamente" });
};
