import { Models } from "@models";
import { Uuid } from "types";

export const seedInstallment = async (models: Models) => {
  try {
    await models.Installment.bulkCreate(
      [
        {
          debt_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          amount: 10000,
          due_date: new Date("10/11/2024"),
          status: "unpaid",
        },
        {
          debt_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          amount: 10000,
          due_date: new Date("10/12/2024"),
          status: "unpaid",
        },
        {
          debt_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          amount: 10000,
          due_date: new Date("10/01/2025"),
          status: "unpaid",
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding seedInstallment completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
