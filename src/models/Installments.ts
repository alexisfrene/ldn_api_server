import {
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../types";
import { Models } from "@models";
import { DebtAttributes } from "./Debts";

export type InstallmentAttributes = InferAttributes<Installment>;
export type InstallmentCreationAttributes =
  InferCreationAttributes<Installment>;

export class Installment extends Model<
  InferAttributes<Installment>,
  InferCreationAttributes<Installment>
> {
  declare installment_id: Uuid;
  declare amount: number;
  declare due_date: Date;
  declare status: "paid" | "unpaid";
  declare debt_id: NonAttribute<Uuid>;

  declare getDebtInstallments: HasOneGetAssociationMixin<DebtAttributes>;

  static associate(models: Models) {
    Installment.belongsTo(models.Debt, {
      as: "DebtInstallments",
      foreignKey: "debt_id",
    });
  }
}

export default (sequelize: Sequelize) => {
  Installment.init(
    {
      installment_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
    },
    {
      sequelize,
      modelName: "Installment",
      tableName: "installments",
      timestamps: false,
    }
  );
  return Installment;
};
