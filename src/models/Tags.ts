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
import { UserAttributes } from "./Users";
import { MovementAttributes } from "./Movements";

export type TagAttributes = InferAttributes<Tag>;
export type TagCreationAttributes = InferCreationAttributes<
  Tag,
  { omit: "tag_id" }
>;

export class Tag extends Model<TagAttributes, TagCreationAttributes> {
  declare tag_id: Uuid;
  declare name: string;
  declare type: "product" | "expense";
  declare user_id: Uuid;
  declare expense_id: Uuid;

  declare getPaymentMethodMovements: HasManyGetAssociationsMixin<MovementAttributes>;
  declare getPaymentMethodUser: HasOneGetAssociationMixin<UserAttributes>;

  static associate(models: Models) {
    const ExpenseTags = Tag.belongsTo(models.Expense, {
      as: "ExpenseTags",
      foreignKey: "expense_id",
    });

    return {
      ExpenseTags,
    };
  }
}

export default (sequelize: Sequelize) => {
  Tag.init(
    {
      tag_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "product",
      },
      user_id: {
        type: DataTypes.UUID,
        references: { model: "users", key: "user_id" },
      },
      expense_id: {
        type: DataTypes.UUID,
        references: { model: "expenses", key: "expense_id" },
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tags",
      timestamps: false,
    }
  );
  return Tag;
};
