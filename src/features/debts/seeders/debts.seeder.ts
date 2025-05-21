import { Uuid } from "types";
import { user_id } from "@utils";
import { Models } from "@models";

const seedDebt = async (models: Models) => {
  try {
    await models.Debt.bulkCreate(
      [
        {
          name: "Mercado Pago Créditos",
          user_id,
          debt_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          interest_per_installment: 3.57,
          total_interest: 11.11,
          minimum_payment: 50000,
          notes: "Crédito de la cuenta de Mercado Pago",
          payment_frequency: "monthly",
          total_debt: 100000,
          money_to_receive: 90000,
        },
        {
          name: "Tarjeta de Crédito Naranja X",
          user_id,
          debt_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          interest_per_installment: 3.57,
          total_interest: 11.11,
          minimum_payment: 50000,
          notes: "Resumen de la tarjeta de crédito naranja x",
          payment_frequency: "monthly",
          total_debt: 100000,
          money_to_receive: 90000,
        },
        {
          name: "Tarjeta de Crédito Reba",
          user_id,
          debt_id: "123e4567-e89b-12d3-a456-426614174002" as Uuid,
          interest_per_installment: 3.57,
          total_interest: 11.11,
          minimum_payment: 50000,
          notes: "Resumen de la tarjeta de crédito reba",
          payment_frequency: "monthly",
          total_debt: 100000,
          money_to_receive: 90000,
        },
        {
          name: "Tarjeta de Crédito Banco Patagonia",
          user_id,
          debt_id: "123e4567-e89b-12d3-a456-426614174003" as Uuid,
          interest_per_installment: 3.57,
          total_interest: 11.11,
          minimum_payment: 50000,
          notes: "Resumen de la tarjeta de crédito banco Patagonia",
          payment_frequency: "monthly",
          total_debt: 100000,
          money_to_receive: 90000,
        },
        {
          name: "Tarjeta de Crédito Uala",
          user_id,
          debt_id: "123e4567-e89b-12d3-a456-426614174004" as Uuid,
          interest_per_installment: 3.57,
          total_interest: 11.11,
          minimum_payment: 50000,
          notes: "Resumen de la tarjeta de crédito banco uala",
          payment_frequency: "monthly",
          total_debt: 100000,
          money_to_receive: 90000,
        },
        {
          name: "Moni Prestamos",
          user_id,
          debt_id: "123e4567-e89b-12d3-a456-426614174005" as Uuid,
          interest_per_installment: 3.57,
          total_interest: 11.11,
          minimum_payment: 50000,
          notes: "Moni prestamos",
          payment_frequency: "monthly",
          total_debt: 100000,
          money_to_receive: 90000,
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding seedDebt completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedDebt;
