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

export const initModels = (sequelize: Sequelize): Models => {
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

  const models = {
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

  Category.associate(models);
  Product.associate(models);
  Size.associate(models);
  Detail.associate(models);
  Variation.associate(models);
  Movement.associate(models);
  Debt.associate(models);
  Installment.associate(models);
  PaymentMethod.associate(models);
  FinancialAccount.associate(models);
  User.associate(models);

  return models;
};
