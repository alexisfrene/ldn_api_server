import { DataTypes } from "sequelize";
import { sequelize } from "../../";

export const Setting = sequelize.define(
  "settings",
  {
    categories_table: { type: DataTypes.STRING, defaultValue: null },
    size_table: { type: DataTypes.STRING, defaultValue: null },
    payment_methods_table: { type: DataTypes.STRING, defaultValue: null },
  },
  { timestamps: true }
);
