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
import { Models } from "@models";
import { Uuid } from "../types";
import { MovementAttributes } from "./Movements";
import { UserAttributes } from "./Users";

export type PaymentMethodAttributes = InferAttributes<PaymentMethod>;
export type PaymentMethodCreationAttributes =
  InferCreationAttributes<PaymentMethod>;

export class PaymentMethod extends Model<
  PaymentMethodAttributes,
  PaymentMethodCreationAttributes
> {
  declare payment_method_id: CreationOptional<number>;
  declare name: string;
  declare user_id: Uuid;

  declare getPaymentMethodMovements: HasManyGetAssociationsMixin<MovementAttributes>;
  declare getPaymentMethodUser: HasOneGetAssociationMixin<UserAttributes>;

  static associate(models: Models) {
    const PaymentMethodUser = PaymentMethod.belongsTo(models.User, {
      as: "PaymentMethodUser",
      foreignKey: "user_id",
    });
    const PaymentMethodMovements = PaymentMethod.hasMany(models.Movement, {
      as: "PaymentMethodMovements",
      foreignKey: "payment_method_id",
    });
    const FinancialAccountsPaymentMethods = PaymentMethod.belongsToMany(
      models.FinancialAccount,
      {
        through: models.FinancialAccountsPaymentMethods,
        foreignKey: "payment_method_id",
      },
    );

    return {
      PaymentMethodUser,
      PaymentMethodMovements,
      FinancialAccountsPaymentMethods,
    };
  }
}

export default (sequelize: Sequelize) => {
  PaymentMethod.init(
    {
      payment_method_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      user_id: {
        type: DataTypes.UUID,
        references: { model: "users", key: "user_id" },
      },
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      tableName: "paymentMethods",
      timestamps: false,
    },
  );
  return PaymentMethod;
};
