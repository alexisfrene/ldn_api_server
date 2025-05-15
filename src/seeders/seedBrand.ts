import { Models } from "@models";
import { user_id } from "./contextSeeders";

const seedBrand = async (models: Models) => {
  try {
    await models.Brand.bulkCreate(
      [
        {
          title: "Default",
          user_id,
          brand_id: 1,
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding seedBrand completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedBrand;
