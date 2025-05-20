import { Request, Response } from "express";
import { recoveryPasswordService } from "../services/recovery-password.services";

export const recoveryPassword = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  const result = await recoveryPasswordService(category_id, category_value);
  return res.status(result.status).json(result.body);
};
