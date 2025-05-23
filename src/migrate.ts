import { databaseConfig, env } from "config/environment";
import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

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
const migrator = new Umzug({
  migrations: {
    glob:
      env === "development"
        ? "src/migrations/**/*.{ts,js}"
        : "build/migrations/**/*.js",
    resolve: ({ name, path, context }) => ({
      name,
      up: async () => (await import(path!)).up(context),
      down: async () => (await import(path!)).down(context),
    }),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export const runMigrations = async () => {
  try {
    await sequelize.authenticate();
    console.log("Iniciando migraciones...");
    await migrator.up();

    console.log("Migraciones completadas.");
  } catch (error) {
    console.error("Error en las migraciones:", error);
  } finally {
    await sequelize.close();
  }
};

export const revertMigrations = async () => {
  try {
    console.log("Revertir migraciones...");
    await migrator.down();
    console.log("Migraciones revertidas.");
  } catch (error) {
    console.error("Error al revertir las migraciones:", error);
  } finally {
    await sequelize.close();
  }
};

if (require.main === module) {
  runMigrations();
}
