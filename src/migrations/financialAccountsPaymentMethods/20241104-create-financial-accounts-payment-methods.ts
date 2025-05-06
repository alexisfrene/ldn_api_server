import { QueryInterface, DataTypes } from "sequelize";

async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("FinancialAccountsPaymentMethods", {
    payment_method_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "paymentMethods",
        key: "payment_method_id",
      },
    },
    financial_accounts_id: {
      type: DataTypes.UUID,
      references: { model: "financialAccounts", key: "financial_accounts_id" },
    },
  });
}

async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("FinancialAccountsPaymentMethods");
}

export { up, down };
