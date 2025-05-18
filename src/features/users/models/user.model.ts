import { BrandAttributes } from "@brands-models/brand.model";
import { CategoryAttributes } from "@categories-models/category.model";
import { SizeAttributes } from "@sizes-models/sizes.model";
import { VariationAttributes } from "@variations-models/variation.model";
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
import { DebtAttributes } from "../../../models/Debts";
import { ExpenseAttributes } from "../../../models/Expenses";
import { FinancialAccountAttributes } from "../../../models/FinancialAccounts";
import { MovementAttributes } from "../../../models/Movements";
import { PaymentMethodAttributes } from "../../../models/PaymentMethods";
import { Uuid } from "../../../types";
import { ProductAttributes } from "../../products/models/product.model";

export type UserAttributes = InferAttributes<User>;
export type UserCreationAttributes = InferCreationAttributes<
  User,
  { omit: "config" | "session_token" }
>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare user_id: CreationOptional<Uuid>;
  declare last_name: string;
  declare first_name: string;
  declare username: string;
  declare email: string;
  declare gender: "male" | "female" | "unspecified";
  declare password_hash: string;
  declare avatar_url: CreationOptional<string | undefined>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare country: CreationOptional<string | null>;
  declare recent_activity: CreationOptional<Array<object>>;
  declare birthday_date: CreationOptional<Date | null>;
  declare phone_number: CreationOptional<string | null>;
  declare role: CreationOptional<string | null>;
  declare session_token: CreationOptional<string | null>;
  declare config: CreationOptional<Record<string, any>>;

  declare getUserCategories: HasManyGetAssociationsMixin<CategoryAttributes>;
  declare getUserVariations: HasManyGetAssociationsMixin<VariationAttributes>;
  declare getUserProducts: HasManyGetAssociationsMixin<ProductAttributes>;
  declare getUserFinancialAccounts: HasManyGetAssociationsMixin<FinancialAccountAttributes>;
  declare getUserPaymentMethods: HasManyGetAssociationsMixin<PaymentMethodAttributes>;
  declare getUserMovements: HasManyGetAssociationsMixin<MovementAttributes>;
  declare getUserSizes: HasManyGetAssociationsMixin<SizeAttributes>;
  declare getUserExpenses: HasManyGetAssociationsMixin<ExpenseAttributes>;
  declare getUserDebts: HasManyGetAssociationsMixin<DebtAttributes>;
  declare getUserBrands: HasManyGetAssociationsMixin<BrandAttributes>;

  static associate(models: Models) {
    const UserSizes = User.hasMany(models.Size, {
      as: "UserSizes",
      foreignKey: "user_id",
    });
    const UserProducts = User.hasMany(models.Product, {
      as: "UserProducts",
      foreignKey: "user_id",
    });
    const UserCategories = User.hasMany(models.Category, {
      as: "UserCategories",
      foreignKey: "user_id",
    });
    const UserVariations = User.hasMany(models.Variation, {
      as: "UserVariations",
      foreignKey: "user_id",
    });
    const UserFinancialAccounts = User.hasMany(models.FinancialAccount, {
      as: "UserFinancialAccounts",
      foreignKey: "user_id",
    });
    const UserPaymentMethods = User.hasMany(models.PaymentMethod, {
      as: "UserPaymentMethods",
      foreignKey: "user_id",
    });
    const UserMovements = User.hasMany(models.Movement, {
      as: "UserMovements",
      foreignKey: "user_id",
    });
    const UserExpenses = User.hasMany(models.Expense, {
      as: "UserExpenses",
      foreignKey: "user_id",
    });
    const UserDebts = User.hasMany(models.Debt, {
      as: "UserDebts",
      foreignKey: "user_id",
    });
    const UserBrands = User.hasMany(models.Brand, {
      as: "UserBrands",
      foreignKey: "user_id",
    });
    return {
      UserBrands,
      UserDebts,
      UserExpenses,
      UserSizes,
      UserProducts,
      UserCategories,
      UserVariations,
      UserFinancialAccounts,
      UserPaymentMethods,
      UserMovements,
    };
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      config: {
        type: DataTypes.JSON,
        defaultValue: { local_image_saving: true },
      },
      last_name: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [1, 15],
        },
      },
      first_name: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [1, 15],
        },
      },
      username: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      recent_activity: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      birthday_date: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      phone_number: { type: DataTypes.STRING, defaultValue: null },
      gender: {
        type: DataTypes.ENUM("male", "female", "unspecified"),
        allowNull: false,
      },
      session_token: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      password_hash: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      avatar_url: {
        type: DataTypes.STRING(255),
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "User", tableName: "users", timestamps: true },
  );

  return User;
};
