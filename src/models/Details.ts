import {
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Models } from "@models";
import { Uuid } from "../types";
import { ProductAttributes } from "./Products";

export type DetailAttributes = InferAttributes<Detail, { omit: "product_id" }>;
export type DetailCreationAttributes = InferCreationAttributes<Detail>;

export class Detail extends Model<DetailAttributes, DetailCreationAttributes> {
  declare detail_id: CreationOptional<number>;
  declare gender: string;
  declare color: string;
  declare style: string;
  declare age: string;
  declare product_id: Uuid;
  declare brand_id: number;

  declare getDetailProduct: HasOneGetAssociationMixin<ProductAttributes>;
  static associate(models: Models) {
    const DetailProduct = Detail.belongsTo(models.Product, {
      as: "DetailProduct",
      foreignKey: "product_id",
    });
    const BrandDetails = Detail.belongsTo(models.Brand, {
      as: "BrandDetails",
      foreignKey: "brand_id",
    });
    return {
      DetailProduct,
      BrandDetails,
    };
  }
}

export default (sequelize: Sequelize) => {
  Detail.init(
    {
      detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      gender: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      color: {
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
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Detail",
      tableName: "details",
      timestamps: false,
    },
  );

  return Detail;
};
