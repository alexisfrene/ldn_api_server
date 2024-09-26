import { Request, Response } from "express";
import { db } from "../../../lib";

const User = db.User;

export const getFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  const financialAccounts = await user.getFinancial_accounts();

  return res.status(200).json(financialAccounts);
};
