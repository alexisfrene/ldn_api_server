import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Models } from "@models";
import { Uuid } from "../types";
import { InstallmentAttributes } from "./Installments";
import { MovementAttributes } from "./Movements";

export type DebtAttributes = InferAttributes<Debt>;
export type DebtCreationAttributes = InferCreationAttributes<
  Debt,
  { omit: "updatedAt" | "createdAt" }
>;
export class Debt extends Model<DebtAttributes, DebtCreationAttributes> {
  declare debt_id: CreationOptional<Uuid>;
  declare name: string;
  declare money_to_receive: number;
  declare total_interest: CreationOptional<number>;
  declare interest_per_installment: CreationOptional<number>;
  declare minimum_payment: CreationOptional<number>;
  declare total_debt: CreationOptional<number>;
  declare notes: CreationOptional<string>;
  declare payment_frequency: CreationOptional<
    "monthly" | "bi-weekly" | "weekly"
  >;
  declare user_id: Uuid;
  declare updatedAt: Date;
  declare createdAt: Date;

  declare getDebtInstallments: HasManyGetAssociationsMixin<InstallmentAttributes>;
  declare getMovementDebts: HasManyGetAssociationsMixin<MovementAttributes>;

  static associate(models: Models) {
    const DebtInstallments = Debt.hasMany(models.Installment, {
      as: "DebtInstallments",
      foreignKey: "debt_id",
    });
    const UserDebts = Debt.belongsTo(models.User, {
      as: "UserDebts",
      foreignKey: "user_id",
    });
    const MovementDebts = Debt.hasMany(models.Movement, {
      as: "MovementDebts",
      foreignKey: "debt_id",
    });
    return {
      DebtInstallments,
      UserDebts,
      MovementDebts,
    };
  }
}

export default (sequelize: Sequelize) => {
  Debt.init(
    {
      debt_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      money_to_receive: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "---",
      },
      total_interest: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      interest_per_installment: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
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
      user_id: {
        type: DataTypes.UUID,
        references: { model: "users", key: "user_id" },
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
      modelName: "Debt",
      tableName: "debts",
      timestamps: true,
    },
  );

  return Debt;
};
