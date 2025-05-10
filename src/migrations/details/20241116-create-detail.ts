import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("details", {
    detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    brand: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    style: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    age: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("details");
}
