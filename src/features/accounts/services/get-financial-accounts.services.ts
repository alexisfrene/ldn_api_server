import { Uuid } from "types";
import { MovementAttributes } from "@movement-models/movements.model";
import { PaymentMethodAttributes } from "@payment-methods-models/payment-methods.model";
import { models } from "@lib/sequelize";

const { FinancialAccount, PaymentMethod, Movement } = models;

export const getFinancialAccountsService = async (
  user_id: Uuid,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { count, rows } = (await FinancialAccount.findAndCountAll({
    where: { user_id },
    attributes: ["financial_accounts_id", "name"],
    distinct: true,
    include: [
      {
        model: PaymentMethod,
        attributes: ["payment_method_id", "name"],
      },
      {
        model: Movement,
        attributes: ["type", "value"],
        as: "FinancialAccountMovements",
      },
    ],
    order: [
      ["name", "ASC"],
      ["financial_accounts_id", "DESC"],
    ],
    limit,
    offset,
  })) as unknown as {
    count: number;
    rows: {
      name: string;
      financial_accounts_id: string;
      FinancialAccountMovements: MovementAttributes[];
      PaymentMethods: PaymentMethodAttributes[];
    }[];
  };

  const formatted = rows.map((account) => {
    const movements = account?.FinancialAccountMovements || [];

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
  });

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
