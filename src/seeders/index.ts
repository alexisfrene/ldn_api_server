import { Models } from "@models";
import { seedUsers } from "./seedUser";
import { seedCategories } from "./seedCategories";
import { seedSizes } from "./seedSizes";
import { seedPaymentMethods } from "./seedPaymentMethod";
import { seedFinancialAccounts } from "./seedFinancialAccounts";
import { seedMovements } from "./seedMovements";
import { seedProducts } from "./seedProducts";
import { seedDetails } from "./seedDetail";
import { seedExpenses } from "./seedExpenses";
import { seedTags } from "./seedTags";
import { seedFinancialAccountsPaymentMethods } from "./seedFinancialAccountsPaymentMethods";

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
  await seedTags(models);
  await seedMovements(models);
};
