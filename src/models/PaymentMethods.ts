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
import { UserAttributes } from "./Users";
import { MovementAttributes } from "./Movements";

export type PaymentMethodAttributes = InferAttributes<PaymentMethod>;
export type PaymentMethodCreationAttributes =
  InferCreationAttributes<PaymentMethod>;

export class PaymentMethod extends Model<
  PaymentMethodAttributes,
  PaymentMethodCreationAttributes
> {
  declare payment_method_id: CreationOptional<Uuid>;
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

    return {
      PaymentMethodUser,
      PaymentMethodMovements,
    };
  }
}

export default (sequelize: Sequelize) => {
  PaymentMethod.init(
    {
      payment_method_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
    }
  );
  return PaymentMethod;
};
