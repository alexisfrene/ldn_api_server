import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("debts", {
    debt_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    money_to_receive: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "---",
    },
    total_interest: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    interest_per_installment: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    payment_frequency: {
      type: DataTypes.ENUM,
      values: ["monthly", "bi-weekly", "weekly"],
      allowNull: false,
      defaultValue: "monthly",
    },
    minimum_payment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_debt: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    current_quota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: "users", key: "user_id" },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("debts");
}
