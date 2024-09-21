import { Sequelize } from "sequelize";
import userModel from "./models/Users";
import sizeModel from "./models/Sizes";
import productModel from "./models/Products";
import categoryModel from "./models/Categories";
import detailModel from "./models/Details";
import variationModel from "./models/Variations";
import movementsModel from "./models/Movements";
import paymentMethodsModel from "./models/PaymentMethods";
import financialAccountsModel from "./models/FinancialAccounts";
import { config as connectionPSQL } from "./config";

const env = "development";
const config = connectionPSQL[env];
if (
  !config.username ||
  !config.password ||
  !config.database ||
  !config.host ||
  !config.port
) {
  throw new Error("Missing required connection configuration properties.");
}
const db: Record<string, any> = {};

let sequelize: Sequelize;

sequelize = new Sequelize(
  config.database || "",
  config.username || "",
  config.password || "",
  { host: config.host, dialect: "postgres", logging: false }
);

const User = userModel(sequelize);
const Size = sizeModel(sequelize);
const Product = productModel(sequelize);
const Category = categoryModel(sequelize);
const Detail = detailModel(sequelize);
const Variation = variationModel(sequelize);
const Movements = movementsModel(sequelize);
const PaymentMethods = paymentMethodsModel(sequelize);
const FinancialAccounts = financialAccountsModel(sequelize);

db[User.name] = User;
db[Size.name] = Size;
db[Product.name] = Product;
db[Category.name] = Category;
db[Detail.name] = Detail;
db[Variation.name] = Variation;
db[Movements.name] = Movements;
db[PaymentMethods.name] = PaymentMethods;
db[FinancialAccounts.name] = FinancialAccounts;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Size.sync({ force: true });
//Variation.sync({ force: true });
// Movements.sync({ force: true });
//FinancialAccounts.sync({ force: true });
// PaymentMethods.sync({ force: true });
// User.sync({ force: true });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db };
