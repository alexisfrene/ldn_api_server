// models/index.ts
import userModel, { UserAttributes } from "./Users"; // Asegúrate de exportar UserAttributes desde Users.ts
import sizeModel, { SizeAttributes } from "./Sizes";
import debtsModel, { DebtAttributes } from "./Debts"; // Asegúrate de exportar DebtsAttributes desde Debts.ts
import detailModel, { DetailAttributes } from "./Details"; // Asegúrate de exportar DetailAttributes desde Details.ts
import productModel, { ProductAttributes } from "./Products"; // Asegúrate de exportar ProductAttributes desde Products.ts
import movementsModel, { MovementAttributes } from "./Movements"; // Asegúrate de exportar MovementsAttributes desde Movements.ts
import categoryModel, { CategoryAttributes } from "./Categories"; // Asegúrate de exportar CategoryAttributes desde Categories.ts
import variationModel, { VariationAttributes } from "./Variations"; // Asegúrate de exportar VariationAttributes desde Variations.ts
import installmentsModel, { InstallmentAttributes } from "./Installments"; // Asegúrate de exportar InstallmentsAttributes desde Installments.ts
import paymentMethodsModel, { PaymentMethodAttributes } from "./PaymentMethods"; // Asegúrate de exportar PaymentMethodsAttributes desde PaymentMethods.ts
import financialAccountsModel, {
  FinancialAccountAttributes,
} from "./FinancialAccounts"; // Asegúrate de exportar FinancialAccountsAttributes desde FinancialAccounts.ts
import { Sequelize } from "sequelize";

export interface Models {
  User: typeof userModel & {
    new (sequelize: Sequelize): UserAttributes;
  };
  Size: typeof sizeModel & {
    new (sequelize: Sequelize): SizeAttributes;
  };
  Debts: typeof debtsModel & {
    new (sequelize: Sequelize): DebtAttributes;
  };
  Detail: typeof detailModel & {
    new (sequelize: Sequelize): DetailAttributes;
  };
  Product: typeof productModel & {
    new (sequelize: Sequelize): ProductAttributes;
  };
  Movements: typeof movementsModel & {
    new (sequelize: Sequelize): MovementAttributes;
  };
  Category: typeof categoryModel & {
    new (sequelize: Sequelize): CategoryAttributes;
  };
  Variation: typeof variationModel & {
    new (sequelize: Sequelize): VariationAttributes;
  };
  Installments: typeof installmentsModel & {
    new (sequelize: Sequelize): InstallmentAttributes;
  };
  PaymentMethods: typeof paymentMethodsModel & {
    new (sequelize: Sequelize): PaymentMethodAttributes;
  };
  FinancialAccounts: typeof financialAccountsModel & {
    new (sequelize: Sequelize): FinancialAccountAttributes;
  };
}

export {
  userModel,
  sizeModel,
  debtsModel,
  detailModel,
  productModel,
  movementsModel,
  categoryModel,
  variationModel,
  installmentsModel,
  paymentMethodsModel,
  financialAccountsModel,
};
