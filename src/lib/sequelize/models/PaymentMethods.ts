import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../../../types";

export default (sequelize: Sequelize) => {
  class PaymentMethods extends Model<
    InferAttributes<PaymentMethods, { omit: "user_id" }>,
    InferCreationAttributes<PaymentMethods, { omit: "user_id" }>
  > {
    declare payment_method_id: Uuid;
    declare name: string;
    declare user_id?: NonAttribute<Uuid>;
  }
  PaymentMethods.init(
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
    },
    {
      sequelize,
      modelName: "PaymentMethods",
      tableName: "payment_methods",
      timestamps: false,
    }
  );
  return PaymentMethods;
};
