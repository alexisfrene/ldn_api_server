import {
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { FinancialAccountAttributes } from "./FinancialAccounts";
import { PaymentMethodAttributes } from "./PaymentMethods";
import { UserAttributes } from "./Users";
import { DebtAttributes } from "./Debts";

export type MovementAttributes = InferAttributes<Movement>;
export type MovementCreationAttributes = InferCreationAttributes<
  Movement,
  { omit: "updatedAt" | "createdAt" }
>;
export class Movement extends Model<
  MovementAttributes,
  MovementCreationAttributes
> {
  declare movements_id: CreationOptional<Uuid>;
  declare entry_date: Date;
  declare label: string;
  declare value: number;
  declare type: "inflow_of_money" | "money_outflow";
  declare updatedAt: Date;
  declare createdAt: Date;

  declare user_id: Uuid;
  declare payment_method_id: number;
  declare financial_accounts_id: Uuid;
  declare expense_id: CreationOptional<Uuid>;
  declare debt_id: CreationOptional<Uuid>;

  declare getFinancialAccountMovements: HasOneGetAssociationMixin<FinancialAccountAttributes>;
  declare getPaymentMethodMovements: HasOneGetAssociationMixin<PaymentMethodAttributes>;
  declare getMovementUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getMovementDebts: HasOneGetAssociationMixin<DebtAttributes>;

  static associate(models: Models) {
    const FinancialAccountMovements = Movement.belongsTo(
      models.FinancialAccount,
      {
        as: "FinancialAccountMovements",
        foreignKey: "financial_accounts_id",
      }
    );
    const PaymentMethodMovements = Movement.belongsTo(models.PaymentMethod, {
      as: "PaymentMethodMovements",
      foreignKey: "payment_method_id",
    });
    const MovementUser = Movement.belongsTo(models.User, {
      as: "MovementUser",
      foreignKey: "user_id",
    });

    const ExpenseMovements = Movement.belongsTo(models.Expense, {
      as: "ExpenseMovements",
      foreignKey: "expense_id",
    });
    const MovementDebts = Movement.belongsTo(models.Debt, {
      as: "MovementDebts",
      foreignKey: "debt_id",
    });
    return {
      MovementDebts,
      FinancialAccountMovements,
      PaymentMethodMovements,
      MovementUser,
      ExpenseMovements,
    };
  }
}

export default (sequelize: Sequelize) => {
  Movement.init(
    {
      movements_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.ENUM("inflow_of_money", "money_outflow"),
        allowNull: false,
        defaultValue: "inflow_of_money",
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      payment_method_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "paymentMethods", key: "payment_method_id" },
      },
      financial_accounts_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "financialAccounts",
          key: "financial_accounts_id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      expense_id: {
        type: DataTypes.UUID,
        references: {
          model: "expenses",
          key: "expense_id",
        },
      },
      debt_id: {
        type: DataTypes.UUID,
        references: {
          model: "debts",
          key: "debt_id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Movement",
      tableName: "movements",
      timestamps: true,
    }
  );
  return Movement;
};
