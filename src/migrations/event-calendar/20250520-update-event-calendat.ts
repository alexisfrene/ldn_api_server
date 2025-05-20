import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn("calendar_events", "createdAt", {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });
  await queryInterface.addColumn("calendar_events", "updatedAt", {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn("calendar_events", "createdAt");
  await queryInterface.removeColumn("calendar_events", "updatedAt");
}
