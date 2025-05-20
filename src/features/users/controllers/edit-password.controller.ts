import { Request, Response } from "express";
import { changePasswordService } from "../services/edit-password.services";

export const changePassword = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.body;
  const result = await changePasswordService(category_id, category_value);
  return res.status(result.status).json(result.body);
};
