import {
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
import { DebtAttributes } from "./Debts";
import { UserAttributes } from "./Users";
import { MovementAttributes } from "./Movements";
export class FinancialAccount extends Model<
  InferAttributes<FinancialAccount>,
  InferCreationAttributes<FinancialAccount, { omit: "financial_accounts_id" }>
> {
  declare financial_accounts_id: Uuid;
  declare name: string;
  declare type: "inflow_of_money" | "money_outflow" | "debts";
  declare user_id: Uuid;

  declare getFinancialAccountDebts: HasManyGetAssociationsMixin<DebtAttributes>;
  declare getFinancialAccountUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getFinancialAccountMovements: HasManyGetAssociationsMixin<MovementAttributes>;

  static associate(models: Models) {
    const FinancialAccountDebts = FinancialAccount.hasMany(models.Debt, {
      as: "FinancialAccountDebts",
      foreignKey: "financial_accounts_id",
    });
    const FinancialAccountUser = FinancialAccount.belongsTo(models.User, {
      as: "FinancialAccountUser",
      foreignKey: "user_id",
    });
    const FinancialAccountMovements = FinancialAccount.hasMany(
      models.Movement,
      {
        as: "FinancialAccountMovements",
        foreignKey: "financial_accounts_id",
      }
    );
    const FinancialAccountExpenses = FinancialAccount.hasMany(models.Expense, {
      as: "FinancialAccountExpenses",
      foreignKey: "financial_accounts_id",
    });
    return {
      FinancialAccountDebts,
      FinancialAccountUser,
      FinancialAccountMovements,
      FinancialAccountExpenses,
    };
  }
}

export type FinancialAccountAttributes = InferAttributes<
  FinancialAccount,
  { omit: "user_id" }
>;
export type FinancialAccountCreationAttributes = InferCreationAttributes<
  FinancialAccount,
  { omit: "user_id" }
>;
export default (sequelize: Sequelize) => {
  FinancialAccount.init(
    {
      financial_accounts_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        references: { model: "users", key: "user_id" },
      },
    },
    {
      sequelize,
      modelName: "FinancialAccount",
      tableName: "financialAccounts",
      timestamps: true,
    }
  );
  return FinancialAccount;
};
