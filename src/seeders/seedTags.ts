import { Models } from "@models";
import { Uuid } from "types";

export const seedTags = async (models: Models) => {
  try {
    await models.Tag.bulkCreate(
      [
        {
          name: "Gastos de expensas",
          type: "expense",
          expense_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        },
        {
          name: "Gastos de servicios",
          type: "expense",
          expense_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding seedTags completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
