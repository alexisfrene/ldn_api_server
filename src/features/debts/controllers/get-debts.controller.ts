import { Request, Response } from "express";
import {
  getAllDebtsService,
  getDebtsByIdService,
} from "../services/get-debts.services";

export const getAllDebts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getAllDebtsService(user_id);
  return res.status(200).json(result);
};

export const getDebtsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getDebtsByIdService(id);
  if (!result) return res.status(404).json({ error: "Gasto no encontrado" });
  return res.status(200).json(result);
};
