import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn("movements", "value", {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn("movements", "value", {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });
}
