import {
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { InstallmentAttributes } from "./Installments";
import { FinancialAccountAttributes } from "./FinancialAccounts";

class Debt extends Model<DebtAttributes, DebtCreationAttributes> {
  declare debt_id: Uuid;
  declare interest_rate: number;
  declare minimum_payment?: number;
  declare total_debt: number;
  declare notes?: string;
  declare payment_frequency: "monthly" | "bi-weekly" | "weekly";
  declare current_quota?: number;
  declare updatedAt: Date;
  declare createdAt: Date;
  declare financial_accounts_id?: NonAttribute<Uuid>;

  declare getDebtInstallments: HasManyGetAssociationsMixin<InstallmentAttributes>;
  declare getFinancialAccountDebts: HasOneGetAssociationMixin<FinancialAccountAttributes>;

  static associate(models: Models) {
    Debt.hasMany(models.Installment, {
      as: "DebtInstallments",
      foreignKey: "debt_id",
    });
    Debt.belongsTo(models.FinancialAccount, {
      as: "FinancialAccountDebts",
      foreignKey: "financial_accounts_id",
    });
  }
}
export type DebtAttributes = InferAttributes<
  Debt,
  { omit: "financial_accounts_id" }
>;
export type DebtCreationAttributes = InferCreationAttributes<
  Debt,
  { omit: "financial_accounts_id" }
>;

export default (sequelize: Sequelize) => {
  Debt.init(
    {
      debt_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      interest_rate: {
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
    },
    {
      sequelize,
      modelName: "Debt",
      tableName: "debts",
      timestamps: true,
    }
  );

  return Debt;
};
