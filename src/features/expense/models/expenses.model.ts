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
import { MovementAttributes } from "@movement-models/movements.model";
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
  declare name: string;

  declare getExpenseMovements: HasManyGetAssociationsMixin<MovementAttributes>;

  static associate(models: Models) {
    const ExpenseMovements = Expense.hasMany(models.Movement, {
      as: "ExpenseMovements",
      foreignKey: "expense_id",
    });
    const UserExpenses = Expense.belongsTo(models.User, {
      as: "UserExpenses",
      foreignKey: "user_id",
    });

    return {
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
      name: {
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
    },
  );
  return Expense;
};
