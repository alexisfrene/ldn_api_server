import { DataTypes } from "sequelize";
import { sequelize } from "../../";

export const Size = sequelize.define(
  "sizes",
  {
    size_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    value: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  { timestamps: true }
);
