import { Request, Response } from "express";
import {
  getAllDebtsService,
  getDebtsByIdService,
  getStatsDebtsService,
} from "../services/get-debts.services";

export const getAllDebts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await getAllDebtsService(user_id, page, limit);
  return res.status(200).json(result);
};

export const getDebtsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getDebtsByIdService(id);
  if (!result) return res.status(404).json({ error: "Gasto no encontrado" });
  return res.status(200).json(result);
};

export const getStatsDebtsController = async (req: Request, res: Response) => {
  const user_id = req.user;
  const result = await getStatsDebtsService(user_id);
  if (!result) return res.status(404).json({ error: "Gasto no encontrado" });
  return res.status(200).json(result);
};
