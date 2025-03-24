import { Models } from "@models";
import seedCategories from "./seedCategories";
import seedDebt from "./seedDebt";
import seedDetails from "./seedDetail";
import seedExpenses from "./seedExpenses";
import seedFinancialAccounts from "./seedFinancialAccounts";
import seedFinancialAccountsPaymentMethods from "./seedFinancialAccountsPaymentMethods";
import seedInstallment from "./seedInstallment";
import seedMovements from "./seedMovements";
import seedPaymentMethods from "./seedPaymentMethod";
import seedProducts from "./seedProducts";
import seedSizes from "./seedSizes";
import seedUsers from "./seedUser";

export const seedDatabase = async (models: Models) => {
  await seedUsers(models);
  await seedCategories(models);
  await seedSizes(models);
  await seedProducts(models);
  await seedDetails(models);
  await seedPaymentMethods(models);
  await seedFinancialAccounts(models);
  await seedFinancialAccountsPaymentMethods(models);
  await seedExpenses(models);
  await seedDebt(models);
  await seedInstallment(models);
  await seedMovements(models);
};
