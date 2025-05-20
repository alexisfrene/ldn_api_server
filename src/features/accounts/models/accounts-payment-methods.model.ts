import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../../../types";
import { PaymentMethod } from "../../payment-methods/models/payment-methods.model";
import { FinancialAccount } from "./accounts.model";

export type FinancialAccountsPaymentMethodsAttributes =
  InferAttributes<FinancialAccountsPaymentMethods>;
export type FinancialAccountsPaymentMethodsCreationAttributes =
  InferCreationAttributes<FinancialAccountsPaymentMethods>;

export class FinancialAccountsPaymentMethods extends Model<
  FinancialAccountsPaymentMethodsAttributes,
  FinancialAccountsPaymentMethodsCreationAttributes
> {
  declare payment_method_id: number;
  declare financial_accounts_id: Uuid;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  FinancialAccountsPaymentMethods.init(
    {
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
    },
    {
      sequelize,
      modelName: "financialAccountsPaymentMethods",
      tableName: "FinancialAccountsPaymentMethods",
      timestamps: true,
    },
  );
  return FinancialAccountsPaymentMethods;
};
