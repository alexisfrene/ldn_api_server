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
  class Sales extends Model<
    InferAttributes<Sales, { omit: "user_id" }>,
    InferCreationAttributes<Sales, { omit: "user_id" }>
  > {
    declare sales_id: Uuid;
    declare label: string;
    declare value: number;
    declare updatedAt: Date;
    declare createdAt: Date;
    declare user_id?: NonAttribute<Uuid>;
  }

  Sales.init(
    {
      sales_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "Sale", tableName: "sales", timestamps: true }
  );
  return Sales;
};
