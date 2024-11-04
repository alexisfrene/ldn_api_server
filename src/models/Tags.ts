import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { ExpenseAttributes } from "./Expenses";

export type TagAttributes = InferAttributes<Tag>;
export type TagCreationAttributes = InferCreationAttributes<Tag>;

export class Tag extends Model<TagAttributes, TagCreationAttributes> {
  declare tag_id: CreationOptional<number>;
  declare name: string;
  declare type: "product" | "expense";
  declare user_id: Uuid;
  declare expense_id: Uuid;

  declare getExpenseTags: HasManyGetAssociationsMixin<ExpenseAttributes>;

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
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
