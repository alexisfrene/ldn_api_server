import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("movements", {
    movements_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    type: {
      type: DataTypes.ENUM("inflow_of_money", "money_outflow"),
      allowNull: false,
      defaultValue: "inflow_of_money",
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "paymentMethods", key: "payment_method_id" },
    },
    financial_accounts_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "financialAccounts",
        key: "financial_accounts_id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    expense_id: {
      type: DataTypes.UUID,
      references: {
        model: "expenses",
        key: "expense_id",
      },
    },
    debt_id: {
      type: DataTypes.UUID,
      references: {
        model: "debts",
        key: "debt_id",
      },
    },
    installment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "installments",
        key: "installment_id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("movements");
}
