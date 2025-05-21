import { MovementAttributes } from "@movement-models/movements.model";
import { PaymentMethod } from "@payment-methods-models/payment-methods.model";
import { UserAttributes } from "@users-models/user.model";
import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "types";
import { Models } from "@models";

export class FinancialAccount extends Model<
  InferAttributes<FinancialAccount>,
  InferCreationAttributes<FinancialAccount>
> {
  declare financial_accounts_id: CreationOptional<Uuid>;
  declare name: string;
  declare active: CreationOptional<boolean>;
  declare user_id: Uuid;
  declare PaymentMethods?: PaymentMethod[];

  declare getFinancialAccountUser: HasOneGetAssociationMixin<UserAttributes>;
  declare getFinancialAccountMovements: HasManyGetAssociationsMixin<MovementAttributes>;

  static associate(models: Models) {
    const FinancialAccountUser = FinancialAccount.belongsTo(models.User, {
      as: "FinancialAccountUser",
      foreignKey: "user_id",
    });
    const FinancialAccountMovements = FinancialAccount.hasMany(
      models.Movement,
      {
        as: "FinancialAccountMovements",
        foreignKey: "financial_accounts_id",
      },
    );
    const FinancialAccountsPaymentMethods = FinancialAccount.belongsToMany(
      models.PaymentMethod,
      {
        through: models.FinancialAccountsPaymentMethods,
        foreignKey: "financial_accounts_id",
      },
    );
    return {
      FinancialAccountUser,
      FinancialAccountMovements,
      FinancialAccountsPaymentMethods,
    };
  }
}

export type FinancialAccountAttributes = InferAttributes<
  FinancialAccount,
  { omit: "user_id" }
>;
export type FinancialAccountCreationAttributes = InferCreationAttributes<
  FinancialAccount,
  { omit: "user_id" }
>;
export default (sequelize: Sequelize) => {
  FinancialAccount.init(
    {
      financial_accounts_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: { model: "users", key: "user_id" },
      },
    },
    {
      sequelize,
      modelName: "FinancialAccount",
      tableName: "financialAccounts",
      timestamps: true,
    },
  );
  return FinancialAccount;
};
