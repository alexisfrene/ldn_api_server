import { Request, Response } from "express";
import { db } from "@lib";

const User = db.User;

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
    financialAccounts.map(async (account: any) => {
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
        type: account.type,
        name: account.name,
      };
    })
  );

  return res.status(200).json(formatter);
};
