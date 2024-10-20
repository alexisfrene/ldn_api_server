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
  class PaymentMethod extends Model<
    InferAttributes<PaymentMethod, { omit: "user_id" }>,
    InferCreationAttributes<PaymentMethod, { omit: "user_id" }>
  > {
    declare payment_method_id: Uuid;
    declare name: string;
    declare user_id?: NonAttribute<Uuid>;

    static associate(models: any) {
      PaymentMethod.belongsTo(models.User, {
        as: "user_payment_methods",
        foreignKey: "user_id",
      });
      PaymentMethod.hasMany(models.Movement, {
        as: "movement_payment_methods",
        foreignKey: "payment_method_id",
      });
    }
  }
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
