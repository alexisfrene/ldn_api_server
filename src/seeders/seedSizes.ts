import { Uuid } from "types";
import { Models } from "@models";

const seedSizes = async (models: Models) => {
  try {
    await models.Size.bulkCreate(
      [
        {
          user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          title: "Default",
          size_id: 101,
          values: [{ id: "default" as Uuid, value: "sin talla" }],
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding Sizes completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedSizes;
