import {
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { ProductAttributes } from "./Products";
export type DetailAttributes = InferAttributes<Detail, { omit: "product_id" }>;
export type DetailCreationAttributes = InferCreationAttributes<
  Detail,
  { omit: "detail_id" }
>;

export class Detail extends Model<DetailAttributes, DetailCreationAttributes> {
  declare detail_id: Uuid;
  declare gender: string;
  declare color: string;
  declare brand: string;
  declare style: string;
  declare age: string;
  declare product_id: Uuid;

  declare getDetailProduct: HasOneGetAssociationMixin<ProductAttributes>;

  static associate(models: Models) {
    Detail.belongsTo(models.Product, {
      as: "DetailProduct",
      foreignKey: "product_id",
    });
  }
}

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
