import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../../../types";

type FinancialItem = {
  name: string;
  updatedAt?: Date;
  createdAt?: Date;
  expiration?: Date;
  id: string;
  value: number;
};

export default (sequelize: Sequelize) => {
  class FinancialAccounts extends Model<
    InferAttributes<FinancialAccounts, { omit: "user_id" }>,
    InferCreationAttributes<FinancialAccounts, { omit: "user_id" }>
  > {
    declare financial_accounts_id: Uuid;
    declare name: string;
    declare type: "inflow_of_money" | "money_outflow";
    declare values: FinancialItem[];
    declare user_id?: NonAttribute<Uuid>;
  }

  FinancialAccounts.init(
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
        defaultValue: 0,
      },
      values: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "FinancialAccounts",
      tableName: "financialAccounts",
      timestamps: false,
    }
  );
  return FinancialAccounts;
};
