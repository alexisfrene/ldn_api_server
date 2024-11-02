import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";

export type ExpenseAttributes = InferAttributes<Expense>;
export type ExpenseCreationAttributes = InferCreationAttributes<Expense>;

export class Expense extends Model<
  ExpenseAttributes,
  ExpenseCreationAttributes
> {
  declare expense_id: CreationOptional<Uuid>;
  declare user_id: Uuid;
  declare description: string;

  static associate(models: Models) {
    const ExpenseTags = Expense.hasMany(models.Tag, {
      as: "ExpenseTags",
      foreignKey: "expense_id",
    });
    const ExpenseMovements = Expense.hasMany(models.Movement, {
      as: "MovementExpense",
      foreignKey: "expense_id",
    });
    const UserExpenses = Expense.belongsTo(models.User, {
      as: "UserExpenses",
      foreignKey: "user_id",
    });

    return {
      ExpenseTags,
      UserExpenses,
      ExpenseMovements,
    };
  }
}

export default (sequelize: Sequelize) => {
  Expense.init(
    {
      expense_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "expenses",
      timestamps: true,
    }
  );
  return Expense;
};
