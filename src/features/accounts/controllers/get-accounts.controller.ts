import { Request, Response } from "express";
import { getFinancialAccountsService } from "@accounts-services/get-financial-accounts.services";
import { getIsValidAccountNameService } from "@accounts-services/get-is-valid-account-name.services";

export const getFinancialAccounts = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const accounts = await getFinancialAccountsService(user_id);
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getIsValidAccountName = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "Missing account name parameter." });
    }
    const isValid = await getIsValidAccountNameService(userId, name as string);
    if (isValid === null) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ isValidAccountName: isValid });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
