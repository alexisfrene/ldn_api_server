import { Sequelize } from "sequelize";
import { config as connectionPSQL } from "@lib/sequelize/config";
import { SequelizeStorage, Umzug } from "umzug";
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
const migrator = new Umzug({
  migrations: {
    glob: "migrations/*.ts",
    resolve: ({ name, path, context }) => {
      const migration = require(path!);
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export const runMigrations = async () => {
  try {
    console.log("Iniciando migraciones...");
    await migrator.up();
    console.log("Migraciones completadas.");
  } catch (error) {
    console.error("Error en las migraciones:", error);
  } finally {
    await sequelize.close(); // Cerrar conexión al final
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
    await sequelize.close(); // Cerrar conexión al final
  }
};

// Ejecuta runMigrations solo si este archivo es el módulo principal
if (require.main === module) {
  runMigrations();
}
