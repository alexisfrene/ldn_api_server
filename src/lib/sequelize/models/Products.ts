import { DataTypes } from "sequelize";
import { sequelize } from "../../";

export const Product = sequelize.define(
  "products",
  {
    id_product: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: "Sin descripción",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    code: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dollar_today: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);
