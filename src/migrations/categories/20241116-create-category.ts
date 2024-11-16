import { QueryInterface, DataTypes } from "sequelize";
type CategoriesItem = {
  id: string;
  value: string;
  icon_url: string;
};

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("categories", {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    type: {
      type: DataTypes.STRING(10),
      defaultValue: "product",
    },
    values: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
      validate: {
        isArrayOfObjects(value: CategoriesItem[]) {
          if (!Array.isArray(value)) {
            throw new Error("Values must be an array");
          }
          for (const item of value) {
            if (
              typeof item !== "object" ||
              item === null ||
              Array.isArray(item)
            ) {
              throw new Error("Each item in values must be an object");
            }
            if (!item.icon_url || typeof item.icon_url !== "string") {
              throw new Error(
                "Each item in values must have an 'icon_url' property of type string"
              );
            }
            if (!item.value || typeof item.value !== "string") {
              throw new Error(
                "Each item in values must have a 'value' property of type string"
              );
            }
          }
        },
      },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("categories");
}
