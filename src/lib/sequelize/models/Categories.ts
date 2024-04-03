import { DataTypes } from "sequelize";
import { sequelize } from "../../";

export const Category = sequelize.define(
  "categories",
  {
    category_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    icon_url: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);
