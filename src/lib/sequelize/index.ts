import { Sequelize } from "sequelize";
import { config as connectionPSQL } from "./postgres_config";
import { initModels } from "@models";
import { seedDatabase } from "seeders";

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

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
  logging: false,
});

const { associations, models } = initModels(sequelize);

const forceSync = process.env.FORCE_SYNC === "true";

sequelize
  .sync({ force: forceSync })
  .then(async () => {
    if (forceSync) {
      await seedDatabase(models);
      console.log("Database synchronized and seeded");
    } else {
      console.log("Database synchronized without seeding");
    }
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });
export { models, sequelize, associations };
