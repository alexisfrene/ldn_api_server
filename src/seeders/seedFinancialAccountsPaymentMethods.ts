import { Uuid } from "types";
import { Models } from "@models";

const seedFinancialAccountsPaymentMethods = async (models: Models) => {
  try {
    await models.FinancialAccountsPaymentMethods.bulkCreate(
      [
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174002" as Uuid,
          payment_method_id: 102,
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding FinancialAccounts completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedFinancialAccountsPaymentMethods;
