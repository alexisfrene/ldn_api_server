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
  class Movement extends Model<
    InferAttributes<
      Movement,
      { omit: "user_id" | "payment_method_id" | "financial_accounts_id" }
    >,
    InferCreationAttributes<
      Movement,
      { omit: "user_id" | "payment_method_id" | "financial_accounts_id" }
    >
  > {
    declare movements_id: Uuid;
    declare entry_date: Date;
    declare label: string;
    declare value: number;
    declare type: "inflow_of_money" | "money_outflow";
    declare updatedAt: Date;
    declare createdAt: Date;
    declare user_id?: NonAttribute<Uuid>;
    declare payment_method_id?: NonAttribute<Uuid>;
    declare financial_accounts_id?: NonAttribute<Uuid>;
    static associate(models: any) {
      Movement.belongsTo(models.FinancialAccount, {
        as: "financial_account_movements",
        foreignKey: "financial_accounts_id",
      });
      Movement.belongsTo(models.PaymentMethod, {
        as: "movement_payment_methods",
        foreignKey: "payment_method_id",
      });
      Movement.belongsTo(models.User, {
        as: "user_movements",
        foreignKey: "user_id",
      });
    }
  }

  Movement.init(
    {
      movements_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      entry_date: DataTypes.DATE,
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inflow_of_money",
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Movement",
      tableName: "movements",
      timestamps: true,
    }
  );
  return Movement;
};
