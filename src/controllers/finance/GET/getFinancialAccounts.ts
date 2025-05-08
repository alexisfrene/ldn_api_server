import { Request, Response } from "express";
import { models } from "@lib";

const { User, PaymentMethod, FinancialAccount } = models;

export const getFinancialAccounts = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const user = await User.findByPk(user_id);
    const financialAccounts = user ? await user.getUserFinancialAccounts() : [];
    const movements = user ? await user.getUserMovements() : [];

    const formatter = await Promise.all(
      financialAccounts.map(async account => {
        const financialAccountWithPaymentMethods =
          await FinancialAccount.findOne({
            where: { financial_accounts_id: account.financial_accounts_id },
            include: [
              {
                model: PaymentMethod,
                attributes: ["payment_method_id", "name"],
              },
            ],
            attributes: [],
            raw: false,
          });

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
          paymentMethods:
            financialAccountWithPaymentMethods?.PaymentMethods?.map(
              paymentMethod => ({
                name: paymentMethod.name,
                payment_method_id: paymentMethod.payment_method_id,
              })
            ),
        };
      })
    );

    const sortedFormatter = formatter.sort((a, b) => b.total - a.total);

    return res.status(200).json(sortedFormatter);
  } catch (error) {
    console.error("Error fetching financial accounts:", error);
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

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const financialAccounts = await user.getUserFinancialAccounts();
    const nameExists = financialAccounts.some(account => account.name === name);

    return res.status(200).json({ isValidAccountName: !nameExists });
  } catch (error) {
    console.error("Error checking account name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
