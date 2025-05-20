import { Request, Response } from "express";
import { userLoginService } from "../services/user-login.services";

export const userLogin = async (req: Request, res: Response) => {
  const { email_or_user, password } = req.body;
  const result = await userLoginService(email_or_user, password);
  return res.status(result.status).json(result.body);
};
