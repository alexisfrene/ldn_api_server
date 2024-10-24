// models/Product.ts
import {
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { Category, CategoryAttributes } from "./Categories";
import { Size, SizeAttributes } from "./Sizes";
import { Detail, DetailAttributes } from "./Details";
import { Variation, VariationAttributes } from "./Variations";
import { User, UserAttributes } from "./Users";

export type ProductAttributes = InferAttributes<Product>;
export type ProductCreationAttributes = InferCreationAttributes<
  Product,
  { omit: "product_id" | "variation_id" | "createdAt" | "updatedAt" }
>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  declare product_id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare primary_image: string;
  declare price: number;
  declare state: boolean;
  declare code: CreationOptional<number>;
  declare stock: CreationOptional<number>;
  declare category_value: CreationOptional<string>;
  declare size_value: CreationOptional<string>;
  declare discount: CreationOptional<number>;
  declare dollar_today: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare user_id: Uuid;
  declare category_id: Uuid;
  declare detail_id: Uuid;
  declare size_id: Uuid;
  declare variation_id?: CreationOptional<Uuid>;

  declare getCategoryProducts: HasOneGetAssociationMixin<CategoryAttributes>;
  declare getSizeProducts: HasOneGetAssociationMixin<SizeAttributes>;
  declare getDetailProduct: HasOneGetAssociationMixin<DetailAttributes>;
  declare getVariationProducts: HasOneGetAssociationMixin<VariationAttributes>;
  declare getUserProducts: HasOneGetAssociationMixin<UserAttributes>;

  static associate(models: Models) {
    Product.belongsTo(models.Category, {
      as: "CategoryProducts",
      foreignKey: "category_id",
    });
    Product.belongsTo(models.Size, {
      as: "SizeProducts",
      foreignKey: "size_id",
    });
    Product.hasOne(models.Detail, {
      as: "DetailProduct",
      foreignKey: "product_id",
    });
    Product.belongsTo(models.Variation, {
      as: "VariationProducts",
      foreignKey: "variation_id",
    });
    Product.belongsTo(models.User, {
      as: "UserProducts",
      foreignKey: "user_id",
    });
  }
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      description: {
        type: DataTypes.STRING(100),
        defaultValue: "Sin descripción",
      },
      primary_image: {
        type: DataTypes.STRING,
        defaultValue: "/default_image",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      code: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dollar_today: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category_value: {
        type: DataTypes.STRING,
      },
      size_value: {
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      user_id: {
        type: DataTypes.UUID,
        references: { model: User, key: "user_id" },
      },
      category_id: {
        type: DataTypes.UUID,
        references: { model: Category, key: "category_id" },
      },
      detail_id: {
        type: DataTypes.UUID,
        references: { model: Detail, key: "detail_id" },
      },
      size_id: {
        type: DataTypes.UUID,
        references: { model: Size, key: "size_id" },
      },
      variation_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: Variation, key: "variation_id" },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
    }
  );

  return Product;
};
