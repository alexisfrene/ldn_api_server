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
import { DebtAttributes } from "./Debts";
import { UserAttributes } from "./Users";
import { MovementAttributes } from "./Movements";
class FinancialAccount extends Model<
  InferAttributes<FinancialAccount, { omit: "user_id" }>,
  InferCreationAttributes<FinancialAccount, { omit: "user_id" }>
> {
  declare financial_accounts_id: Uuid;
  declare name: string;
  declare type: "inflow_of_money" | "money_outflow" | "debts";
  declare user_id?: NonAttribute<Uuid>;

  declare getFinancialAccountDebts: HasManyGetAssociationsMixin<DebtAttributes>;
  declare getFinancialAccountUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getFinancialAccountMovements: HasManyGetAssociationsMixin<MovementAttributes>;

  static associate(models: Models) {
    FinancialAccount.hasMany(models.Debt, {
      as: "FinancialAccountDebts",
      foreignKey: "financial_accounts_id",
    });
    FinancialAccount.belongsTo(models.User, {
      as: "FinancialAccountUser",
      foreignKey: "user_id",
    });
    FinancialAccount.hasMany(models.Movement, {
      as: "FinancialAccountMovements",
      foreignKey: "financial_accounts_id",
    });
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
