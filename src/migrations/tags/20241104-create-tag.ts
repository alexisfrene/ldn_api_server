import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("tags", {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "product",
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: "users", key: "user_id" },
    },
    expense_id: {
      type: DataTypes.UUID,
      references: { model: "expenses", key: "expense_id" },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("tags");
}
