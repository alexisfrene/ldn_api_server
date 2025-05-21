import { Sequelize } from "sequelize";
import brandModel from "@brands-models/brand.model";
import categoryModel from "@categories-models/category.model";
import detailModel from "@products-models/detail.model";
import productModel from "@products-models/product.model";
import sizesModel from "@sizes-models/sizes.model";
import variationModel from "@variations-models/variation.model";
import eventCalendarModel from "@event-calendar-models/calendar-event.model";
import financialAccountsModel from "@accounts-models/accounts.model";
import expensesModel from "@expense-models/expenses.model";
import debtsModel from "@debt-models/debts.model";
import financialAccountsPaymentMethodsModel from "../features/accounts/models/accounts-payment-methods.model";
import installmentsModel from "../features/debts/models/installments.model";
import movementsModel from "../features/movements/models/movements.model";
import paymentMethodsModel from "../features/payment-methods/models/payment-methods.model";
import userModel from "../features/users/models/user.model";

interface ModelAssociations {
  Category: ReturnType<typeof categoryModel>["associate"];
  Product: ReturnType<typeof productModel>["associate"];
  Expense: ReturnType<typeof expensesModel>["associate"];
  Size: ReturnType<typeof sizesModel>["associate"];
  Detail: ReturnType<typeof detailModel>["associate"];
  Variation: ReturnType<typeof variationModel>["associate"];
  Movement: ReturnType<typeof movementsModel>["associate"];
  Debt: ReturnType<typeof debtsModel>["associate"];
  Installment: ReturnType<typeof installmentsModel>["associate"];
  PaymentMethod: ReturnType<typeof paymentMethodsModel>["associate"];
  FinancialAccount: ReturnType<typeof financialAccountsModel>["associate"];
  User: ReturnType<typeof userModel>["associate"];
  Brand: ReturnType<typeof brandModel>["associate"];
  EventCalendar: ReturnType<typeof eventCalendarModel>["associate"];
}

export interface Models {
  FinancialAccountsPaymentMethods: ReturnType<
    typeof financialAccountsPaymentMethodsModel
  >;
  User: ReturnType<typeof userModel>;
  Size: ReturnType<typeof sizesModel>;
  Debt: ReturnType<typeof debtsModel>;
  Brand: ReturnType<typeof brandModel>;
  Detail: ReturnType<typeof detailModel>;
  Product: ReturnType<typeof productModel>;
  Expense: ReturnType<typeof expensesModel>;
  Category: ReturnType<typeof categoryModel>;
  Movement: ReturnType<typeof movementsModel>;
  Variation: ReturnType<typeof variationModel>;
  Installment: ReturnType<typeof installmentsModel>;
  PaymentMethod: ReturnType<typeof paymentMethodsModel>;
  EventCalendar: ReturnType<typeof eventCalendarModel>;
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
  const Size = sizesModel(sequelize);
  const Debt = debtsModel(sequelize);
  const Detail = detailModel(sequelize);
  const Product = productModel(sequelize);
  const Expense = expensesModel(sequelize);
  const Brand = brandModel(sequelize);
  const Category = categoryModel(sequelize);
  const Movement = movementsModel(sequelize);
  const EventCalendar = eventCalendarModel(sequelize);
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
    EventCalendar,
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
    EventCalendar: EventCalendar.associate(models),
  } as InitModelsReturnType["associations"];

  return { models, associations };
};
