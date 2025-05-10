import { DataTypes, QueryInterface } from "sequelize";

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
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("categories");
}
