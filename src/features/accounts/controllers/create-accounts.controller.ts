import { Request, Response } from "express";
import { createFinancialAccountService } from "@accounts-services/create-financial-account.services";

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name, paymentMethods } = req.body;
  try {
    const newFinancialAccount = await createFinancialAccountService(
      user_id,
      name,
      paymentMethods,
    );
    return res.status(200).json({ newFinancialAccount });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
