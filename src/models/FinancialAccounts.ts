import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";

export default (sequelize: Sequelize) => {
  class FinancialAccount extends Model<
    InferAttributes<FinancialAccount, { omit: "user_id" }>,
    InferCreationAttributes<FinancialAccount, { omit: "user_id" }>
  > {
    declare financial_accounts_id: Uuid;
    declare name: string;
    declare type: "inflow_of_money" | "money_outflow" | "debts";
    declare user_id?: NonAttribute<Uuid>;

    static associate(models: any) {
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
