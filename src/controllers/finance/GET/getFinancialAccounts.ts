import { Request, Response } from "express";
import { models } from "@lib";

const { User, PaymentMethod, FinancialAccount } = models;

export const getFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  if (!user_id) {
    return res.status(400).json({ error: "User ID not provided" });
  }

  const user = await User.findByPk(user_id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const financialAccounts = await user.getUserFinancialAccounts();
  if (!financialAccounts || financialAccounts.length === 0) {
    return res.status(200).json([]);
  }

  const movements = await user.getUserMovements();

  const formatter = await Promise.all(
    financialAccounts.map(async (account) => {
      const financialAccountWithPaymentMethods = await FinancialAccount.findOne(
        {
          where: { financial_accounts_id: account.financial_accounts_id },
          include: [
            {
              model: PaymentMethod,
              attributes: ["payment_method_id", "name"],
            },
          ],
          attributes: [],
          raw: false,
        }
      );
      const filterMovements = movements.filter(
        (movement: any) =>
          movement.financial_accounts_id === account.financial_accounts_id
      );
      const totalValue = filterMovements.reduce(
        (acc: number, movement: any) => {
          if (movement.type === "money_outflow") {
            return acc - movement.value;
          } else {
            return acc + movement.value;
          }
        },
        0
      );

      return {
        financial_accounts_id: account.financial_accounts_id,
        total: totalValue,
        name: account.name,
        paymentMethods: financialAccountWithPaymentMethods?.PaymentMethods?.map(
          (paymentMethod) => ({
            name: paymentMethod.name,
            payment_method_id: paymentMethod.payment_method_id,
          })
        ),
      };
    })
  );

  return res.status(200).json(formatter);
};
