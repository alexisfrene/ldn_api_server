import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeColumn("debts", "current_quota");
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.addColumn("debts", "current_quota", {
    type: "INTEGER",
    allowNull: false,
    defaultValue: 1,
  });
}
