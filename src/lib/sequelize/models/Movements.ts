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
  class Movements extends Model<
    InferAttributes<Movements, { omit: "user_id" | "payment_method_id" }>,
    InferCreationAttributes<
      Movements,
      { omit: "user_id" | "payment_method_id" }
    >
  > {
    declare movements_id: Uuid;
    declare label: string;
    declare value: number;
    declare type: 0 | 1; //0 = Entrada de dinero , 1=Salida de dinero;
    declare updatedAt: Date;
    declare createdAt: Date;
    declare user_id?: NonAttribute<Uuid>;
    declare payment_method_id?: NonAttribute<Uuid>;
  }

  Movements.init(
    {
      movements_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "Movements",
      tableName: "movements",
      timestamps: true,
    }
  );
  return Movements;
};
