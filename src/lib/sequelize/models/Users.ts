import { DataTypes } from "sequelize";
import { sequelize } from "../../";
import { Setting } from "./Settings";
//import { Product } from "./Products";
//const Setting = require("./Settings.js");

export const User = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    last_name: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
      allowNull: false,
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
    },
    recent_activity: {
      type: DataTypes.STRING,
      defaultValue: null,
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
    session_toke: {
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
    products_table: { type: DataTypes.STRING, defaultValue: null },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
  },
  { timestamps: true }
);

User.hasOne(Setting, { foreignKey: "user_id" });
//User.hasMany(Product, { foreignKey: "user_id" });
