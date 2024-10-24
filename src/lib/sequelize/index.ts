import { Sequelize } from "sequelize";
import { config as connectionPSQL } from "./config";
import { initModels } from "@models";

type Env = "development" | "production";

const env: Env = (process.env.NODE_ENV as Env) || "development";

const config = connectionPSQL[env];

if (!config) {
  throw new Error(`Database configuration for environment ${env} not found.`);
}

const { database, username, password, host } = config;
if (!database || !username || !password || !host) {
  throw new Error("Missing required connection configuration properties.");
}

let sequelize: Sequelize;
try {
  sequelize = new Sequelize(database, username, password, {
    host,
    dialect: "postgres",
    logging: false,
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
  throw error;
}

const models = initModels(sequelize);

sequelize.sync({ force: false }).catch((error) => {
  console.error("Error syncing the database:", error);
});

export { models, sequelize };
