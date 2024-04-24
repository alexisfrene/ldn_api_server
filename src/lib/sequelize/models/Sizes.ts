import { DataTypes } from "sequelize";
import { sequelize } from "../../";
import { Uuid } from "../../../types";

type SizeItem = {
  name: string;
  id: Uuid;
  value: string;
};

export const Size = sequelize.define(
  "sizes",
  {
    size_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    values: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
      validate: {
        isArrayOfObjects(value: SizeItem) {
          if (!Array.isArray(value)) {
            throw new Error("Values must be an array");
          }
          for (const item of value) {
            if (
              typeof item !== "object" ||
              item === null ||
              Array.isArray(item)
            ) {
              throw new Error("Each item in values must be an object");
            }
            if (!item.name || typeof item.name !== "string") {
              throw new Error(
                "Each item in values must have a 'name' property of type string"
              );
            }
            if (!item.id || typeof item.id !== "number") {
              throw new Error(
                "Each item in values must have an 'id' property of type number"
              );
            }
            if (!item.value || typeof item.value !== "string") {
              throw new Error(
                "Each item in values must have a 'value' property of type string"
              );
            }
          }
        },
      },
    },
  },
  { timestamps: false }
);
