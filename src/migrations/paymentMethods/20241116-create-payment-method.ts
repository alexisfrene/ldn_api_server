import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("paymentMethods", {
    payment_method_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: "users", key: "user_id" },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("paymentMethods");
}
