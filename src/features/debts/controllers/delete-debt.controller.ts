import { Request, Response } from "express";
import { deleteDebtService } from "../services/delete-debt.services";

export const deleteDebt = async (req: Request, res: Response) => {
  const debt_id = req.params.id;
  const result = await deleteDebtService(debt_id);
  if (result.error) {
    return res.status(404).json({ error: result.error });
  }
  return res.status(204).json(result);
};
