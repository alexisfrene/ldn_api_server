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
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174003" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174004" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174005" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174006" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174007" as Uuid,
          payment_method_id: 101,
        },
        {
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174008" as Uuid,
          payment_method_id: 101,
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding FinancialAccounts completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedFinancialAccountsPaymentMethods;
