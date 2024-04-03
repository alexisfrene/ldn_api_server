import { Sequelize } from "sequelize";
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
} = process.env;
const databasePort = Number(DATABASE_PORT) || undefined;

export const sequelize = new Sequelize(
  DATABASE_NAME || "",
  DATABASE_USER || "",
  DATABASE_PASSWORD || "",
  {
    host: DATABASE_HOST,
    dialect: "postgres",
    port: databasePort,
    logging: false,
  }
);
