import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";

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
        as: "CategoryVariations",
        foreignKey: "category_id",
      });
      Variation.belongsTo(models.User, {
        as: "VariationUser",
        foreignKey: "user_id",
      });
      Variation.hasMany(models.Product, {
        as: "VariationProducts",
        foreignKey: "variation_id",
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
