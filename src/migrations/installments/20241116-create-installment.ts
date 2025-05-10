import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("installments", {
    installment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("paid", "unpaid"),
      allowNull: false,
      defaultValue: "unpaid",
    },
    debt_id: {
      type: DataTypes.UUID,
      references: { model: "debts", key: "debt_id" },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("installments");
}
