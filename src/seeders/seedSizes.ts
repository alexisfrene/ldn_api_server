import { Uuid } from "types";
import { Models } from "@models";
import { user_id } from "./contextSeeders";

const seedSizes = async (models: Models) => {
  try {
    await models.Size.bulkCreate(
      [
        {
          user_id,
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
