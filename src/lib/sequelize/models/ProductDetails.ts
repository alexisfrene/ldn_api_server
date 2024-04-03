import { DataTypes } from "sequelize";
import { sequelize } from "../../";

export const ProductDetails = sequelize.define(
  "product_details",
  {
    gender: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
    },
    color: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
    },
    brand: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
    },
    style: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
    },
    age: {
      type: DataTypes.STRING(15),
      defaultValue: "-",
    },
  },
  { timestamps: true }
);
