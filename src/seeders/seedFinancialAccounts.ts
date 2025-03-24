import { Uuid } from "types";
import { Models } from "@models";
import { user_id } from "./contextSeeders";

const seedFinancialAccounts = async (models: Models) => {
  try {
    await models.FinancialAccount.bulkCreate(
      [
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          name: "Caja",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          name: "Mercado Pago",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174002" as Uuid,
          name: "Banco Santander",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174003" as Uuid,
          name: "Banco Patagonia",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174004" as Uuid,
          name: "Banco Entre Rios",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174005" as Uuid,
          name: "Uala",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174006" as Uuid,
          name: "Personal Pay",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174007" as Uuid,
          name: "Naranja X",
        },
        {
          user_id,
          financial_accounts_id: "123e4567-e89b-12d3-a456-426614174008" as Uuid,
          name: "Banco BNA",
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding FinancialAccounts completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedFinancialAccounts;
