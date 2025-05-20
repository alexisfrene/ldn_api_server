import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { FinancialAccount, FinancialAccountsPaymentMethods } = models;

export const createFinancialAccountService = async (
  user_id: Uuid,
  name: string,
  paymentMethods: number[],
) => {
  const newFinancialAccount = await FinancialAccount.create({
    name,
    user_id,
  });

  if (paymentMethods?.length) {
    const paymentMethodsPromise = paymentMethods.map((paymentMethod) =>
      FinancialAccountsPaymentMethods.create({
        financial_accounts_id: newFinancialAccount.financial_accounts_id,
        payment_method_id: paymentMethod,
      }),
    );
    await Promise.all(paymentMethodsPromise);
  }

  return newFinancialAccount;
};