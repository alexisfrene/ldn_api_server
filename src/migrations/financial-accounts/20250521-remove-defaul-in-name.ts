import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn("financialAccounts", "name", {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn("financialAccounts", "name", {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: "Sin nombre",
  });
}
