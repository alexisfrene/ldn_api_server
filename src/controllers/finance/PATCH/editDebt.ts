import { Request, Response } from "express";
import { models } from "@lib";

const { Debt } = models;

export const editDebt = async (req: Request, res: Response) => {
  const debt_id = req.params.id;

  const debtSelected = await Debt.findByPk(debt_id);
  if (!debtSelected)
    res
      .status(400)
      .json({ error: true, message: "No se encontró la deuda seleccionada !" });
  await debtSelected!.update({
    name: req.body.name,
    notes: req.body.notes,
    current_quota: req.body.current_quota,
    minimum_payment: req.body.minimum_payment,
    money_to_receive: req.body.money_to_receive,
    payment_frequency: req.body.payment_frequency,
    total_debt: req.body.total_debt,
  });
  res.status(200).json({ ok: true });
};
