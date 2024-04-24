import { DataTypes } from "sequelize";
import { sequelize } from "../../";
import { Product } from "./Products";
import { Size } from "./Sizes";
import { Category } from "./Categories";

export const User = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
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
    products_table: { type: DataTypes.STRING, defaultValue: "" },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
  },
  { timestamps: true }
);

User.hasMany(Product, { as: "products", foreignKey: "user_id" });
Product.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Size, { as: "sizes", foreignKey: "user_id" });
Size.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Category, { as: "category", foreignKey: "user_id" });
Category.belongsTo(User, { foreignKey: "user_id" });
