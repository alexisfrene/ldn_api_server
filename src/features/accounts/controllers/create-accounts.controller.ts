import { Request, Response } from "express";
import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { FinancialAccount, FinancialAccountsPaymentMethods } = models;

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name, paymentMethods }: { name: string; paymentMethods: number[] } =
    req.body;

  const newFinancialAccount = await FinancialAccount.create({
    name,
    user_id: user_id as Uuid,
  });
  if (paymentMethods?.length) {
    const paymentMethodsPromise = paymentMethods.map(async (paymentMethod) =>
      FinancialAccountsPaymentMethods.create({
        financial_accounts_id: newFinancialAccount.financial_accounts_id,
        payment_method_id: paymentMethod,
      }),
    );
    await Promise.all(paymentMethodsPromise);
  }

  return res.status(200).json({ newFinancialAccount });
};
