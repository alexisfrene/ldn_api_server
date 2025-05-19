import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { FinancialAccount, FinancialAccountsPaymentMethods } = models;

export const editFinancialAccountService = async (
  user_id: Uuid,
  financial_accounts_id: string,
  name: string,
  payments_methods: number[],
) => {
  const financialAccount = await FinancialAccount.findByPk(
    financial_accounts_id,
  );

  if (!financialAccount) return { notFound: true };
  if (financialAccount.user_id !== user_id) return { forbidden: true };

  if (name) financialAccount.name = name;

  const currentRelations = await FinancialAccountsPaymentMethods.findAll({
    where: { financial_accounts_id },
    attributes: ["payment_method_id"],
  });
  const currentPaymentMethods = currentRelations.map(
    (relation) => relation.payment_method_id,
  );
  const methodsToAdd = payments_methods.filter(
    (id: number) => !currentPaymentMethods.includes(id),
  );
  const methodsToRemove = currentPaymentMethods.filter(
    (id: number) => !payments_methods.includes(id),
  );
  if (methodsToRemove.length) {
    await FinancialAccountsPaymentMethods.destroy({
      where: {
        financial_accounts_id,
        payment_method_id: methodsToRemove,
      },
    });
  }
  if (methodsToAdd.length) {
    const newRelations = methodsToAdd.map((id: number) => ({
      financial_accounts_id: financial_accounts_id as Uuid,
      payment_method_id: id,
    }));
    await FinancialAccountsPaymentMethods.bulkCreate(newRelations);
  }

  await financialAccount.save();
  return { financialAccount };
};