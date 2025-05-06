import { QueryInterface, DataTypes } from "sequelize";

async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("brands", {
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });
}

async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("brands");
}

export { up, down };
