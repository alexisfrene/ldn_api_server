import { DataTypes, QueryInterface } from "sequelize";

type SizeItem = {
  id: number;
  value: string;
};

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("sizes", {
    size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    values: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
      validate: {
        isArrayOfObjects(value: SizeItem[]) {
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
            if (!item.value || typeof item.value !== "string") {
              throw new Error(
                "Each item in values must have a 'value' property of type string",
              );
            }
          }
        },
      },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("sizes");
}
