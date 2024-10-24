import {
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { ProductAttributes } from "./Products";
import { UserAttributes } from "./Users";
import { VariationAttributes } from "./Variations";

type CategoriesItem = {
  id: string;
  value: string;
  icon_url: string;
};
export type CategoryAttributes = InferAttributes<Category, { omit: "user_id" }>;
export type CategoryCreationAttributes = InferCreationAttributes<
  Category,
  { omit: "category_id" }
>;

export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  declare category_id: Uuid;
  declare title: string;
  declare values: CategoriesItem[];
  declare user_id: Uuid;

  declare getCategoryProducts: HasManyGetAssociationsMixin<ProductAttributes>;
  declare getCategoryUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getCategoryVariations: HasManyGetAssociationsMixin<VariationAttributes>;

  static associate(models: Models) {
    Category.hasMany(models.Product, {
      as: "CategoryProducts",
      foreignKey: "category_id",
    });
    Category.belongsTo(models.User, {
      as: "CategoryUser",
      foreignKey: "user_id",
    });
    Category.hasMany(models.Variation, {
      as: "CategoryVariations",
      foreignKey: "category_id",
    });
  }
}

export default (sequelize: Sequelize) => {
  Category.init(
    {
      category_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(50),
        defaultValue: "",
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
                  "Each item in values must have an 'icon_url' property of type string"
                );
              }
              if (!item.value || typeof item.value !== "string") {
                throw new Error(
                  "Each item in values must have a 'value' property of type string"
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
    }
  );
  return Category;
};
