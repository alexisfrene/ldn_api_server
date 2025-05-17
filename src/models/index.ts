import brandModel from "@brands-models/brand.model";
import categoryModel from "@categories-models/category.model";
import { Sequelize } from "sequelize";
import debtsModel from "./Debts";
import detailModel from "./Details";
import expenseModel from "./Expenses";
import financialAccountsModel from "./FinancialAccounts";
import financialAccountsPaymentMethodsModel from "./FinancialAccountsPaymentMethods";
import installmentsModel from "./Installments";
import movementsModel from "./Movements";
import paymentMethodsModel from "./PaymentMethods";
import productModel from "./Products";
import sizeModel from "./Sizes";
import userModel from "./Users";
import variationModel from "./Variations";

interface ModelAssociations {
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
  Brand: ReturnType<typeof brandModel>["associate"];
}

export interface Models {
  FinancialAccountsPaymentMethods: ReturnType<
    typeof financialAccountsPaymentMethodsModel
  >;
  User: ReturnType<typeof userModel>;
  Size: ReturnType<typeof sizeModel>;
  Debt: ReturnType<typeof debtsModel>;
  Brand: ReturnType<typeof brandModel>;
  Detail: ReturnType<typeof detailModel>;
  Product: ReturnType<typeof productModel>;
  Expense: ReturnType<typeof expenseModel>;
  Category: ReturnType<typeof categoryModel>;
  Movement: ReturnType<typeof movementsModel>;
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
  const User = userModel(sequelize);
  const Size = sizeModel(sequelize);
  const Debt = debtsModel(sequelize);
  const Detail = detailModel(sequelize);
  const Product = productModel(sequelize);
  const Expense = expenseModel(sequelize);
  const Brand = brandModel(sequelize);
  const Category = categoryModel(sequelize);
  const Movement = movementsModel(sequelize);
  const Variation = variationModel(sequelize);
  const Installment = installmentsModel(sequelize);
  const PaymentMethod = paymentMethodsModel(sequelize);
  const FinancialAccount = financialAccountsModel(sequelize);
  const FinancialAccountsPaymentMethods =
    financialAccountsPaymentMethodsModel(sequelize);

  const models: Models = {
    User,
    Size,
    Debt,
    Brand,
    Detail,
    Expense,
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
    Brand: Brand.associate(models),
  } as InitModelsReturnType["associations"];

  return { models, associations };
};
