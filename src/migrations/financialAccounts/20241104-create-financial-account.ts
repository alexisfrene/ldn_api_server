import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("financialAccounts", {
    financial_accounts_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sin nombre",
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: "users", key: "user_id" },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("financialAccounts");
}
