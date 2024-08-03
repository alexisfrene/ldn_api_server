import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Uuid } from "../../../types";

type FinancialItem = {
  name: string;
  id: string;
  value: number;
};

export default (sequelize: Sequelize) => {
  class FinancialAccounts extends Model<
    InferAttributes<FinancialAccounts, { omit: "user_id" }>,
    InferCreationAttributes<FinancialAccounts, { omit: "user_id" }>
  > {
    declare financial_accounts_id: Uuid;
    declare title: string;
    declare type: number; //0 = Entrada de dinero , 1=Salida de dinero | 2 = Pago deuda | 3 = pago sueldos;
    declare values: FinancialItem[];
    declare user_id?: NonAttribute<Uuid>;
  }

  FinancialAccounts.init(
    {
      financial_accounts_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin nombre",
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      values: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
        validate: {
          isArrayOfObjects(value: FinancialItem[]) {
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
              if (!item.id || typeof item.id !== "string") {
                throw new Error(
                  "Each item in values must have an 'id' property of type string"
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
    {
      sequelize,
      modelName: "FinancialAccounts",
      tableName: "financial_accounts",
      timestamps: false,
    }
  );
  return FinancialAccounts;
};
