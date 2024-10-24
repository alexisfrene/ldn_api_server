// models/Details.ts
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";

class Detail extends Model<DetailAttributes, DetailCreationAttributes> {
  declare detail_id: Uuid;
  declare gender: string;
  declare color: string;
  declare brand: string;
  declare style: string;
  declare age: string;
  declare product_id?: NonAttribute<Uuid>;

  static associate(models: any) {
    Detail.belongsTo(models.Product, {
      as: "DetailProduct",
      foreignKey: "product_id",
    });
  }
}
export type DetailAttributes = InferAttributes<Detail, { omit: "product_id" }>;
export type DetailCreationAttributes = InferCreationAttributes<
  Detail,
  { omit: "product_id" }
>;

export default (sequelize: Sequelize) => {
  Detail.init(
    {
      detail_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      gender: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      brand: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      style: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      age: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
    },
    {
      sequelize,
      modelName: "Detail",
      tableName: "details",
      timestamps: false,
    }
  );

  return Detail;
};
