import { ProductAttributes } from "@products-models/product.model";
import { UserAttributes } from "@users-models/user.model";
import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "types";
import { Models } from "@models";

type SizeItem = {
  id: string;
  value: string;
};
export type SizeAttributes = InferAttributes<Size, { omit: "user_id" }>;
export type SizeCreationAttributes = InferCreationAttributes<Size>;
export class Size extends Model<SizeAttributes, SizeCreationAttributes> {
  declare size_id: CreationOptional<number>;
  declare title: string;
  declare values: SizeItem[];
  declare user_id?: Uuid;

  declare getSizeProducts: HasManyGetAssociationsMixin<ProductAttributes>;
  declare getSizeUser: HasManyGetAssociationsMixin<UserAttributes>;

  static associate(models: Models) {
    const SizeProducts = Size.hasMany(models.Product, {
      as: "SizeProducts",
      foreignKey: "size_id",
    });
    const SizeUser = Size.belongsTo(models.User, {
      as: "SizeUser",
      foreignKey: "user_id",
    });

    return {
      SizeProducts,
      SizeUser,
    };
  }
}

export default (sequelize: Sequelize) => {
  Size.init(
    {
      size_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      values: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
        validate: {
          isArrayOfObjects(value: SizeItem[]) {
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
    { sequelize, modelName: "Size", tableName: "sizes", timestamps: false },
  );
  return Size;
};
