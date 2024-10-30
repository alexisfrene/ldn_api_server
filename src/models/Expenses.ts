import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";

export type ExpenseAttributes = InferAttributes<Expense>;
export type ExpenseCreationAttributes = InferCreationAttributes<
  Expense,
  { omit: "expense_id" }
>;

export class Expense extends Model<
  ExpenseAttributes,
  ExpenseCreationAttributes
> {
  declare expense_id: Uuid;
  declare description: string;
  declare financial_accounts_id: Uuid;

  static associate(models: Models) {
    const FinancialAccountExpenses = Expense.belongsTo(
      models.FinancialAccount,
      {
        as: "FinancialAccountExpenses",
        foreignKey: "financial_accounts_id",
      }
    );
    const ExpenseTags = Expense.hasMany(models.Tag, {
      as: "ExpenseTags",
      foreignKey: "expense_id",
    });

    return {
      FinancialAccountExpenses,
      ExpenseTags,
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
      financial_accounts_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "financialAccounts",
          key: "financial_accounts_id",
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
