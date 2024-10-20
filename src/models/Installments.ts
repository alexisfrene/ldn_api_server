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
  class Installment extends Model<
    InferAttributes<Installment>,
    InferCreationAttributes<Installment>
  > {
    declare installment_id: Uuid;
    declare amount: number;
    declare due_date: Date;
    declare status: "paid" | "unpaid";
    declare debt_id: NonAttribute<Uuid>;

    static associate(models: any) {
      Installment.belongsTo(models.Debt, {
        as: "DebtInstallments",
        foreignKey: "debt_id",
      });
    }
  }

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
