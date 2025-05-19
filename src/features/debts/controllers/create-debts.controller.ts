import { Request, Response } from "express";
import { Uuid } from "types";
import { createDebtsService } from "../services/create-debts.services";

export const createDebts = async (req: Request, res: Response) => {
  const user_id = req.user as Uuid;
  const result = await createDebtsService(user_id, req.body);
  return res.status(200).json(result);
};
