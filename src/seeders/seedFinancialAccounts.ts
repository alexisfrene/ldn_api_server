import { Uuid } from "types";
import { Models } from "@models";

export const seedFinancialAccounts = async (models: Models) => {
  try {
    await models.FinancialAccount.bulkCreate(
      [
        {
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          name: "Caja",
        },
        {
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          name: "Mercado Pago",
        },
        {
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174002" as Uuid,
          name: "Banco Santander",
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding FinancialAccounts completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
