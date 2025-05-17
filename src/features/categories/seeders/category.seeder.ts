import { Models } from "@models";
import { user_id } from "@utils";

const seedCategories = async (models: Models) => {
  try {
    await models.Category.bulkCreate(
      [
        {
          user_id,
          title: "Default",
          category_id: 101,
          values: [{ icon_url: "", id: "default", value: "Sin categoría" }],
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding Categories completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedCategories;
