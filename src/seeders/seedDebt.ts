import { Models } from "@models";
import { Uuid } from "types";

export const seedDebt = async (models: Models) => {
  try {
    await models.Debt.bulkCreate(
      [
        {
          name: "Mercado Pago Créditos",
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          current_quota: 1,
          debt_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          interest_rate: 12,
          minimum_payment: 50000,
          notes: "Crédito de la cuenta de Mercado Pago",
          payment_frequency: "monthly",
          total_debt: 100000,
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding seedDebt completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
