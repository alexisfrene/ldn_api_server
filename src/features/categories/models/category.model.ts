import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "types";
import { ProductAttributes } from "@products-models/product.model";
import { UserAttributes } from "@users-models/user.model";
import { VariationAttributes } from "@variations-models/variation.model";
import { Models } from "@models";

type CategoriesItem = {
  id: string;
  value: string;
  icon_url: string;
};
export type CategoryAttributes = InferAttributes<Category, { omit: "user_id" }>;
export type CategoryCreationAttributes = InferCreationAttributes<Category>;

export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  declare category_id: CreationOptional<number>;
  declare title: string;
  declare type: CreationOptional<"product" | "expense">;
  declare values: CategoriesItem[];
  declare user_id: Uuid;

  declare getCategoryProducts: HasManyGetAssociationsMixin<ProductAttributes>;
  declare getCategoryUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getCategoryVariations: HasManyGetAssociationsMixin<VariationAttributes>;

  static associate(models: Models) {
    const CategoryProducts = Category.hasMany(models.Product, {
      as: "CategoryProducts",
      foreignKey: "category_id",
    });
    const CategoryUser = Category.belongsTo(models.User, {
      as: "CategoryUser",
      foreignKey: "user_id",
    });
    const CategoryVariations = Category.hasMany(models.Variation, {
      as: "CategoryVariations",
      foreignKey: "category_id",
    });

    return {
      CategoryProducts,
      CategoryUser,
      CategoryVariations,
    };
  }
}

export default (sequelize: Sequelize) => {
  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        defaultValue: "",
      },
      type: {
        type: DataTypes.STRING(10),
        defaultValue: "product",
      },
      values: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
        validate: {
          isArrayOfObjects(value: CategoriesItem[]) {
            if (!Array.isArray(value)) {
              throw new Error("Values must be an array");
            }
            for (const item of value) {
              if (
                typeof item !== "object" ||
                item === null ||
                Array.isArray(item)
              ) {
                throw new Error("Each item in values must be an object");
              }
              if (!item.icon_url || typeof item.icon_url !== "string") {
                throw new Error(
                  "Each item in values must have an 'icon_url' property of type string",
                );
              }
              if (!item.value || typeof item.value !== "string") {
                throw new Error(
                  "Each item in values must have a 'value' property of type string",
                );
              }
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: false,
    },
  );
  return Category;
};
