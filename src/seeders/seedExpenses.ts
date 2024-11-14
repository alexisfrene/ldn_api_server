import { Models } from "@models";
import { Uuid } from "types";
import { user_id } from "./contextSeeders";
const seedExpenses = async (models: Models) => {
  try {
    await models.Expense.bulkCreate(
      [
        {
          description: "Gastos de expensas",
          name: "Expensas",
          user_id,
          expense_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        },
        {
          description: "Gastos de servicios",
          name: "Servicios",
          user_id,
          expense_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding seedExpenses completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedExpenses;
