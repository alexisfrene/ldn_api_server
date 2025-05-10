import {
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Models } from "@models";
import { Uuid } from "../types";
import { DebtAttributes } from "./Debts";

export type InstallmentAttributes = InferAttributes<Installment>;
export type InstallmentCreationAttributes =
  InferCreationAttributes<Installment>;

export class Installment extends Model<
  InstallmentAttributes,
  InstallmentCreationAttributes
> {
  declare installment_id: CreationOptional<number>;
  declare amount: number;
  declare due_date: Date;
  declare status: "paid" | "unpaid";
  declare debt_id: Uuid;

  declare getDebtInstallments: HasOneGetAssociationMixin<DebtAttributes>;

  static associate(models: Models) {
    const DebtInstallments = Installment.belongsTo(models.Debt, {
      as: "DebtInstallments",
      foreignKey: "debt_id",
    });
    const MovementInstallments = Installment.hasMany(models.Movement, {
      as: "MovementInstallments",
      foreignKey: "installment_id",
    });

    return {
      DebtInstallments,
      MovementInstallments,
    };
  }
}

export default (sequelize: Sequelize) => {
  Installment.init(
    {
      installment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("paid", "unpaid"),
        allowNull: false,
        defaultValue: "unpaid",
      },
      debt_id: {
        type: DataTypes.UUID,
        references: { model: "debts", key: "debt_id" },
      },
    },
    {
      sequelize,
      modelName: "Installment",
      tableName: "installments",
      timestamps: false,
    },
  );
  return Installment;
};
