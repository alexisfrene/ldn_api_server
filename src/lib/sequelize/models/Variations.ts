import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../../../types";

type VariationItem = {
  id: Uuid;
  label: string;
  images: string[];
};

export default (sequelize: Sequelize) => {
  class Variation extends Model<
    InferAttributes<Variation, { omit: "user_id" | "category_id" }>,
    InferCreationAttributes<Variation, { omit: "user_id" | "category_id" }>
  > {
    declare variation_id: Uuid;
    declare title: string;
    declare values: VariationItem[];
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare user_id?: NonAttribute<Uuid>;
    declare category_id?: NonAttribute<Uuid>;
    declare category_value: Uuid;
    static associate(models: any) {
      Variation.belongsTo(models.Category, {
        as: "categories",
        foreignKey: "category_id",
      });
    }
  }

  Variation.init(
    {
      variation_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      category_value: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      values: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
        validate: {
          isArrayOfObjects(value: VariationItem[]) {
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
              if (!item.label || typeof item.label !== "string") {
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
      modelName: "Variation",
      tableName: "variations",
      timestamps: true,
    }
  );
  return Variation;
};
