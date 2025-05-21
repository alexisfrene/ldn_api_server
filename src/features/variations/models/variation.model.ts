import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "types";
import { ProductAttributes } from "@products-models/product.model";
import { UserAttributes } from "@users-models/user.model";
import { Models } from "@models";

type VariationItem = {
  id: Uuid;
  label: string;
  images: string[];
};

export type VariationAttributes = InferAttributes<Variation>;
export type VariationCreationAttributes = InferCreationAttributes<
  Variation,
  { omit: "createdAt" | "updatedAt" }
>;

export class Variation extends Model<
  VariationAttributes,
  VariationCreationAttributes
> {
  declare variation_id: CreationOptional<Uuid>;
  declare title: string;
  declare values: VariationItem[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user_id?: NonAttribute<Uuid>;
  declare category_id?: NonAttribute<Uuid>;
  declare category_value: Uuid;

  declare getCategoryVariations: HasOneGetAssociationMixin<VariationAttributes>;
  declare getVariationUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getVariationProducts: HasManyGetAssociationsMixin<ProductAttributes>;

  static associate(models: Models) {
    const CategoryVariations = Variation.belongsTo(models.Category, {
      as: "CategoryVariations",
      foreignKey: "category_id",
    });
    const VariationUser = Variation.belongsTo(models.User, {
      as: "VariationUser",
      foreignKey: "user_id",
    });
    const VariationProducts = Variation.hasMany(models.Product, {
      as: "VariationProducts",
      foreignKey: "variation_id",
    });

    return {
      CategoryVariations,
      VariationUser,
      VariationProducts,
    };
  }
}

export default (sequelize: Sequelize) => {
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
    },
  );
  return Variation;
};
