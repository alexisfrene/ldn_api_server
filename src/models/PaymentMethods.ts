import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";

class PaymentMethod extends Model<
  InferAttributes<PaymentMethod, { omit: "user_id" }>,
  InferCreationAttributes<PaymentMethod, { omit: "user_id" }>
> {
  declare payment_method_id: Uuid;
  declare name: string;
  declare user_id?: NonAttribute<Uuid>;

  static associate(models: Models) {
    PaymentMethod.belongsTo(models.User, {
      as: "PaymentMethodUser",
      foreignKey: "user_id",
    });
    PaymentMethod.hasMany(models.Movement, {
      as: "PaymentMethodMovements",
      foreignKey: "payment_method_id",
    });
  }
}
export type PaymentMethodAttributes = InferAttributes<PaymentMethod>;
export type PaymentMethodCreationAttributes =
  InferCreationAttributes<PaymentMethod>;
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
        unique: true,
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
