import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { FinancialAccount, User, PaymentMethod } = models;

export const getFinancialAccountsService = async (user_id: Uuid) => {
  const user = await User.findByPk(user_id);
  const financialAccounts = user ? await user.getUserFinancialAccounts() : [];
  const movements = user ? await user.getUserMovements() : [];

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
        },
      );

      const filterMovements = movements.filter(
        (movement: any) =>
          movement.financial_accounts_id === account.financial_accounts_id,
      );

      const totalValue = filterMovements.reduce(
        (acc: number, movement: any) => {
          if (movement.type === "money_outflow") {
            return acc - movement.value;
          } else {
            return acc + movement.value;
          }
        },
        0,
      );

      return {
        financial_accounts_id: account.financial_accounts_id,
        total: totalValue,
        name: account.name,
        paymentMethods: financialAccountWithPaymentMethods?.PaymentMethods?.map(
          (paymentMethod) => ({
            name: paymentMethod.name,
            payment_method_id: paymentMethod.payment_method_id,
          }),
        ),
      };
    }),
  );

  return formatter.sort((a, b) => b.total - a.total);
};