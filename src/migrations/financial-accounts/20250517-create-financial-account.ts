import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn("financialAccounts", "active", {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn("financialAccounts", "active");
}
