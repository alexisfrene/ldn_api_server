// models/Size.ts
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";

type SizeItem = {
  id: Uuid;
  value: string;
};
class Size extends Model<SizeAttributes, SizeCreationAttributes> {
  declare size_id: Uuid;
  declare title: string;
  declare values: SizeItem[];
  declare user_id?: NonAttribute<Uuid>;

  static associate(models: Models) {
    Size.hasMany(models.Product, {
      as: "SizeProducts",
      foreignKey: "size_id",
    });
    Size.belongsTo(models.User, {
      as: "SizeUser",
      foreignKey: "user_id",
    });
  }
}

export type SizeAttributes = InferAttributes<Size, { omit: "user_id" }>;
export type SizeCreationAttributes = InferCreationAttributes<
  Size,
  { omit: "user_id" }
>;

export default (sequelize: Sequelize) => {
  Size.init(
    {
      size_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
              if (!item.id || typeof item.id !== "string") {
                throw new Error(
                  "Each item in values must have an 'id' property of type string"
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
    { sequelize, modelName: "Size", tableName: "sizes", timestamps: false }
  );
  return Size;
};
