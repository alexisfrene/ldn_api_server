import { Sequelize } from "sequelize";

import { initModels } from "@models";
import { seedDatabase } from "seeders";
import { databaseConfig, env, forceSync } from "config/environment";

if (!databaseConfig) {
  throw new Error(`Database configuration for environment ${env} not found.`);
}

const { database, username, password, host } = databaseConfig;
if (!database || !username || !password || !host) {
  throw new Error("Missing required connection configuration properties.");
}

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
  logging: false,
});

const { associations, models } = initModels(sequelize);

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
  .catch(err => {
    console.error("Error synchronizing database:", err);
  });
export { models, sequelize, associations };
