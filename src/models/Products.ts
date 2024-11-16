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
import { SizeAttributes } from "./Sizes";
import { Variation } from "./Variations";
import { CategoryAttributes } from "./Categories";
import { User } from "./Users";
import { DetailAttributes } from "./Details";
import { Models } from "@models";

export type ProductAttributes = InferAttributes<Product>;
export type ProductCreationAttributes = InferCreationAttributes<Product>;

export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  declare product_id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare primary_image: string;
  declare price: number;
  declare state: boolean;
  declare stock: CreationOptional<number>;
  declare category_value: CreationOptional<string>;
  declare size_value: CreationOptional<number>;
  declare discount: CreationOptional<number>;
  declare dollar_today: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare user_id: Uuid;
  declare category_id: number;
  declare size_id: number;
  declare variation_id?: CreationOptional<Uuid>;

  declare getCategoryProducts: HasOneGetAssociationMixin<CategoryAttributes>;
  declare getSizeProducts: HasOneGetAssociationMixin<SizeAttributes>;
  declare getDetailProduct: HasOneGetAssociationMixin<DetailAttributes>;
  declare getVariationProducts: HasOneGetAssociationMixin<Variation>;
  declare getUserProducts: HasOneGetAssociationMixin<User>;

  static associate(models: Models) {
    const CategoryProducts = Product.belongsTo(models.Category, {
      as: "CategoryProducts",
      foreignKey: "category_id",
    });
    const SizeProducts = Product.belongsTo(models.Size, {
      as: "SizeProducts",
      foreignKey: "size_id",
    });
    const DetailProduct = Product.hasOne(models.Detail, {
      as: "DetailProduct",
      foreignKey: "product_id",
    });
    const VariationProducts = Product.belongsTo(models.Variation, {
      as: "VariationProducts",
      foreignKey: "variation_id",
    });
    const UserProducts = Product.belongsTo(models.User, {
      as: "UserProducts",
      foreignKey: "user_id",
    });

    return {
      CategoryProducts,
      SizeProducts,
      DetailProduct,
      VariationProducts,
      UserProducts,
    };
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
        references: { model: "users", key: "user_id" },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: { model: "categories", key: "category_id" },
      },
      size_id: {
        type: DataTypes.INTEGER,
        references: { model: "sizes", key: "size_id" },
      },
      variation_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "variations", key: "variation_id" },
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
