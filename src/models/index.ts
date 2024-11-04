import tagModel from "./Tags";
import userModel from "./Users";
import sizeModel from "./Sizes";
import debtsModel from "./Debts";
import detailModel from "./Details";
import productModel from "./Products";
import expenseModel from "./Expenses";
import movementsModel from "./Movements";
import categoryModel from "./Categories";
import variationModel from "./Variations";
import installmentsModel from "./Installments";
import paymentMethodsModel from "./PaymentMethods";
import financialAccountsModel from "./FinancialAccounts";
import financialAccountsPaymentMethodsModel from "./FinancialAccountsPaymentMethods";
import { Sequelize } from "sequelize";

interface ModelAssociations {
  Tag: ReturnType<typeof tagModel>["associate"];
  Category: ReturnType<typeof categoryModel>["associate"];
  Product: ReturnType<typeof productModel>["associate"];
  Expense: ReturnType<typeof expenseModel>["associate"];
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
  FinancialAccountsPaymentMethods: ReturnType<
    typeof financialAccountsPaymentMethodsModel
  >;
  Tag: ReturnType<typeof tagModel>;
  User: ReturnType<typeof userModel>;
  Size: ReturnType<typeof sizeModel>;
  Debt: ReturnType<typeof debtsModel>;
  Detail: ReturnType<typeof detailModel>;
  Product: ReturnType<typeof productModel>;
  Expense: ReturnType<typeof expenseModel>;
  Movement: ReturnType<typeof movementsModel>;
  Category: ReturnType<typeof categoryModel>;
  Variation: ReturnType<typeof variationModel>;
  Installment: ReturnType<typeof installmentsModel>;
  PaymentMethod: ReturnType<typeof paymentMethodsModel>;
  FinancialAccount: ReturnType<typeof financialAccountsModel>;
}

type InitModelsReturnType = {
  models: Models;
  associations: {
    [K in keyof ModelAssociations]: ReturnType<ModelAssociations[K]>;
  };
};

export const initModels = (sequelize: Sequelize): InitModelsReturnType => {
  const Tag = tagModel(sequelize);
  const User = userModel(sequelize);
  const Size = sizeModel(sequelize);
  const Debt = debtsModel(sequelize);
  const Detail = detailModel(sequelize);
  const Product = productModel(sequelize);
  const Expense = expenseModel(sequelize);
  const Movement = movementsModel(sequelize);
  const Category = categoryModel(sequelize);
  const Variation = variationModel(sequelize);
  const Installment = installmentsModel(sequelize);
  const PaymentMethod = paymentMethodsModel(sequelize);
  const FinancialAccount = financialAccountsModel(sequelize);
  const FinancialAccountsPaymentMethods =
    financialAccountsPaymentMethodsModel(sequelize);

  const models: Models = {
    Tag,
    User,
    Size,
    Debt,
    Expense,
    Detail,
    Product,
    Movement,
    Category,
    Variation,
    Installment,
    PaymentMethod,
    FinancialAccount,
    FinancialAccountsPaymentMethods,
  };

  const associations = {
    Tag: Tag.associate(models),
    Category: Category.associate(models),
    Product: Product.associate(models),
    Size: Size.associate(models),
    Expense: Expense.associate(models),
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
