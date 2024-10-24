import {
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { FinancialAccountAttributes } from "./FinancialAccounts";
import { PaymentMethodAttributes } from "./PaymentMethods";
import { UserAttributes } from "./Users";

class Movement extends Model<MovementAttributes, MovementCreationAttributes> {
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

  declare getFinancialAccountMovements: HasOneGetAssociationMixin<FinancialAccountAttributes>;
  declare getPaymentMethodMovements: HasOneGetAssociationMixin<PaymentMethodAttributes>;
  declare getMovementUser: HasOneGetAssociationMixin<UserAttributes>;

  static associate(models: Models) {
    Movement.belongsTo(models.FinancialAccount, {
      as: "FinancialAccountMovements",
      foreignKey: "financial_accounts_id",
    });
    Movement.belongsTo(models.PaymentMethod, {
      as: "PaymentMethodMovements",
      foreignKey: "payment_method_id",
    });
    Movement.belongsTo(models.User, {
      as: "MovementUser",
      foreignKey: "user_id",
    });
  }
}
export type MovementAttributes = InferAttributes<
  Movement,
  { omit: "user_id" | "payment_method_id" | "financial_accounts_id" }
>;
export type MovementCreationAttributes = InferCreationAttributes<
  Movement,
  { omit: "user_id" | "payment_method_id" | "financial_accounts_id" }
>;

export default (sequelize: Sequelize) => {
  Movement.init(
    {
      movements_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.ENUM("inflow_of_money", "money_outflow"),
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
