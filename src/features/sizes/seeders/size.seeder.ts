import { Models } from "@models";
import { user_id } from "@utils";

const seedSizes = async (models: Models) => {
  try {
    await models.Size.bulkCreate(
      [
        {
          user_id,
          title: "Default",
          size_id: 101,
          values: [
            { id: "0", value: "sin talla" },
            { id: "1", value: "N/A" },
          ],
        },
        {
          user_id,
          title: "Números de zapatillas adulto",
          size_id: 102,
          values: [
            { id: "1", value: "44" },
            { id: "2", value: "43" },
            { id: "3", value: "42" },
            { id: "4", value: "41" },
            { id: "5", value: "40" },
          ],
        },
        {
          user_id,
          title: "Números de zapatillas niño",
          size_id: 103,
          values: [
            { id: "1", value: "39" },
            { id: "2", value: "38" },
            { id: "3", value: "37" },
            { id: "4", value: "36" },
            { id: "5", value: "35" },
          ],
        },
        {
          user_id,
          title: "Tallas de remeras",
          size_id: 104,
          values: [
            { id: "1", value: "M" },
            { id: "2", value: "L" },
            { id: "3", value: "XL" },
            { id: "4", value: "XXL" },
            { id: "5", value: "XXXL" },
          ],
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding Sizes completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedSizes;
