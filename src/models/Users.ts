// models/Users.ts
import {
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  DataTypes,
} from "sequelize";
import { Uuid } from "../types";

class User extends Model<UserAttributes, UserCreationAttributes> {
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
  declare config: Record<string, any>;

  get fullName(): NonAttribute<string> {
    return `${this.first_name} ${this.last_name}`;
  }

  static associate(models: any) {
    User.hasMany(models.Size, { as: "UserSizes", foreignKey: "user_id" });
    User.hasMany(models.Product, { as: "UserProducts", foreignKey: "user_id" });
    User.hasMany(models.Category, {
      as: "UserCategories",
      foreignKey: "user_id",
    });
    User.hasMany(models.Variation, {
      as: "UserVariations",
      foreignKey: "user_id",
    });
    User.hasMany(models.FinancialAccount, {
      as: "UserFinancialAccounts",
      foreignKey: "user_id",
    });
    User.hasMany(models.PaymentMethod, {
      as: "UserPaymentMethods",
      foreignKey: "user_id",
    });
    User.hasMany(models.Movement, {
      as: "UserMovements",
      foreignKey: "user_id",
    });
  }
}

export type UserAttributes = InferAttributes<User>;
export type UserCreationAttributes = InferCreationAttributes<User>;

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
    { sequelize, modelName: "User", tableName: "users", timestamps: true }
  );

  return User;
};
