import { FinancialAccount } from "@models/FinancialAccounts";
import { PaymentMethod } from "@models/PaymentMethods";
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("FinancialAccountsPaymentMethods", {
    payment_method_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PaymentMethod,
        key: "payment_method_id",
      },
    },
    financial_accounts_id: {
      type: DataTypes.UUID,
      references: {
        model: FinancialAccount,
        key: "financial_accounts_id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("FinancialAccountsPaymentMethods");
}
