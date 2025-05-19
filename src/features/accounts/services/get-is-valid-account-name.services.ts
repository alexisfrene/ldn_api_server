import { Uuid } from "types";
import { models } from "@lib/sequelize";

const { User } = models;

export const getIsValidAccountNameService = async (
  user_id: Uuid,
  name: string,
) => {
  const user = await User.findByPk(user_id);
  if (!user) return null;
  const financialAccounts = await user.getUserFinancialAccounts();
  const nameExists = financialAccounts.some((account) => account.name === name);
  return !nameExists;
};