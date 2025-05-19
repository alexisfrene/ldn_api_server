import { Request, Response } from "express";
import { getPreferenceInProductViewService } from "../services/get-user-preferences.services";

export const getPreferenceInProductView = async (
  req: Request,
  res: Response,
) => {
  const user_id = req.user;
  const result = await getPreferenceInProductViewService(user_id);
  return res.status(result.status).json(result.body);
};
