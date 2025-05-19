import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { FinancialAccount } = models;

export const deleteFinancialAccountService = async (
  user_id: Uuid,
  id: string,
) => {
  const financialAccount = await FinancialAccount.findByPk(id);

  if (!financialAccount) return { notFound: true };
  if (financialAccount.user_id !== user_id) return { forbidden: true };

  await financialAccount.destroy();
  return { deleted: true };
};