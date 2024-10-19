import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";

export default (sequelize: Sequelize) => {
  class Debts extends Model<
    InferAttributes<Debts, { omit: "financial_accounts_id" }>,
    InferCreationAttributes<Debts, { omit: "financial_accounts_id" }>
  > {
    declare debt_id: Uuid;
    declare interest_rate: number;
    declare minimum_payment?: number;
    declare total_debt: number;
    declare notes?: string;
    declare payment_frequency: "monthly" | "bi-weekly" | "weekly";
    declare closing_date?: Date;
    declare current_quota?: number;
    declare updatedAt: Date;
    declare createdAt: Date;
    declare financial_accounts_id?: NonAttribute<Uuid>;

    static associate(models: any) {
      Debts.hasOne(models.FinancialAccounts, {
        as: "debt",
        foreignKey: "financial_accounts_id",
      });
    }
  }

  Debts.init(
    {
      debt_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      interest_rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      payment_frequency: {
        type: DataTypes.ENUM,
        values: ["monthly", "bi-weekly", "weekly"],
        allowNull: false,
        defaultValue: "monthly",
      },
      minimum_payment: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_debt: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      current_quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Debts",
      tableName: "debts",
      timestamps: true,
    }
  );
  return Debts;
};
