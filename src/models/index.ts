import userModel from "./Users";
import sizeModel from "./Sizes";
import debtsModel from "./Debts";
import detailModel from "./Details";
import productModel from "./Products";
import movementsModel from "./Movements";
import categoryModel from "./Categories";
import variationModel from "./Variations";
import installmentsModel from "./Installments";
import paymentMethodsModel from "./PaymentMethods";
import financialAccountsModel from "./FinancialAccounts";
import { Sequelize } from "sequelize";

// Definimos los tipos de las asociaciones para cada modelo
interface ModelAssociations {
  Category: ReturnType<typeof categoryModel>["associate"];
  Product: ReturnType<typeof productModel>["associate"];
  Size: ReturnType<typeof sizeModel>["associate"];
  Detail: ReturnType<typeof detailModel>["associate"];
  Variation: ReturnType<typeof variationModel>["associate"];
  Movement: ReturnType<typeof movementsModel>["associate"];
  Debt: ReturnType<typeof debtsModel>["associate"];
  Installment: ReturnType<typeof installmentsModel>["associate"];
  PaymentMethod: ReturnType<typeof paymentMethodsModel>["associate"];
  FinancialAccount: ReturnType<typeof financialAccountsModel>["associate"];
  User: ReturnType<typeof userModel>["associate"];
}

export interface Models {
  User: ReturnType<typeof userModel>;
  Size: ReturnType<typeof sizeModel>;
  Debt: ReturnType<typeof debtsModel>;
  Detail: ReturnType<typeof detailModel>;
  Product: ReturnType<typeof productModel>;
  Movement: ReturnType<typeof movementsModel>;
  Category: ReturnType<typeof categoryModel>;
  Variation: ReturnType<typeof variationModel>;
  Installment: ReturnType<typeof installmentsModel>;
  PaymentMethod: ReturnType<typeof paymentMethodsModel>;
  FinancialAccount: ReturnType<typeof financialAccountsModel>;
}

// Creamos el tipo que retornará las asociaciones junto con los modelos
type InitModelsReturnType = {
  models: Models;
  associations: {
    [K in keyof ModelAssociations]: ReturnType<ModelAssociations[K]>;
  };
};

export const initModels = (sequelize: Sequelize): InitModelsReturnType => {
  const User = userModel(sequelize);
  const Size = sizeModel(sequelize);
  const Debt = debtsModel(sequelize);
  const Detail = detailModel(sequelize);
  const Product = productModel(sequelize);
  const Movement = movementsModel(sequelize);
  const Category = categoryModel(sequelize);
  const Variation = variationModel(sequelize);
  const Installment = installmentsModel(sequelize);
  const PaymentMethod = paymentMethodsModel(sequelize);
  const FinancialAccount = financialAccountsModel(sequelize);

  const models: Models = {
    User,
    Size,
    Debt,
    Detail,
    Product,
    Movement,
    Category,
    Variation,
    Installment,
    PaymentMethod,
    FinancialAccount,
  };

  // Ejecutar las asociaciones y tiparlas
  const associations = {
    Category: Category.associate(models),
    Product: Product.associate(models),
    Size: Size.associate(models),
    Detail: Detail.associate(models),
    Variation: Variation.associate(models),
    Movement: Movement.associate(models),
    Debt: Debt.associate(models),
    Installment: Installment.associate(models),
    PaymentMethod: PaymentMethod.associate(models),
    FinancialAccount: FinancialAccount.associate(models),
    User: User.associate(models),
  } as InitModelsReturnType["associations"];

  return { models, associations };
};
