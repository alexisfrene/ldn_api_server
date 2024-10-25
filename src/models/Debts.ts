import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { InstallmentAttributes } from "./Installments";
import { FinancialAccountAttributes } from "./FinancialAccounts";

export type DebtAttributes = InferAttributes<Debt>;
export type DebtCreationAttributes = InferCreationAttributes<
  Debt,
  { omit: "debt_id" | "updatedAt" | "createdAt" }
>;
export class Debt extends Model<DebtAttributes, DebtCreationAttributes> {
  declare debt_id: Uuid;
  declare interest_rate: CreationOptional<number>;
  declare minimum_payment: CreationOptional<number>;
  declare total_debt: CreationOptional<number>;
  declare notes: CreationOptional<string>;
  declare payment_frequency: CreationOptional<
    "monthly" | "bi-weekly" | "weekly"
  >;
  declare current_quota: CreationOptional<number>;
  declare updatedAt: Date;
  declare createdAt: Date;
  declare financial_accounts_id: Uuid;

  declare getDebtInstallments: HasManyGetAssociationsMixin<InstallmentAttributes>;
  declare getFinancialAccountDebts: HasOneGetAssociationMixin<FinancialAccountAttributes>;

  static associate(models: Models) {
    const DebtInstallments = Debt.hasMany(models.Installment, {
      as: "DebtInstallments",
      foreignKey: "debt_id",
    });
    const FinancialAccountDebts = Debt.belongsTo(models.FinancialAccount, {
      as: "FinancialAccountDebts",
      foreignKey: "financial_accounts_id",
    });

    return {
      DebtInstallments,
      FinancialAccountDebts,
    };
  }
}

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
      financial_accounts_id: {
        type: DataTypes.UUID,
        references: {
          model: "financialAccounts",
          key: "financial_accounts_id",
        },
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
