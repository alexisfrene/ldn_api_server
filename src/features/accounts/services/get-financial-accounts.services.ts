import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { FinancialAccount, PaymentMethod } = models;

export const getFinancialAccountsService = async (
  user_id: Uuid,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await FinancialAccount.findAndCountAll({
    where: { user_id },
    attributes: ["financial_accounts_id", "name"],
    distinct: true,
    include: [
      {
        model: PaymentMethod,
        attributes: ["payment_method_id", "name"],
      },
    ],
    order: [
      ["name", "ASC"],
      ["financial_accounts_id", "DESC"],
    ],
    limit,
    offset,
  });

  const formatted = await Promise.all(
    rows.map(async (account) => {
      const movements = await account.getFinancialAccountMovements();

      const totalValue = movements.reduce((acc: number, movement) => {
        return movement.type === "money_outflow"
          ? acc - movement.value
          : acc + movement.value;
      }, 0);

      return {
        financial_accounts_id: account.financial_accounts_id,
        total: totalValue,
        name: account.name,
        paymentMethods: account.PaymentMethods,
      };
    }),
  );

  return {
    status: 200,
    body: {
      accounts: formatted,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
      limit,
    },
  };
};
