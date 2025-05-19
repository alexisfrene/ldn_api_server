import { Request, Response } from "express";
import { editDebtService } from "../services/edit-debt.services";

export const editDebt = async (req: Request, res: Response) => {
  const debt_id = req.params.id;
  const result = await editDebtService(debt_id, req.body);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.status(200).json(result);
};
