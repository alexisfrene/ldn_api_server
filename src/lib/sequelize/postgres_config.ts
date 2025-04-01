process.loadEnvFile();

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  POSTGRES_DB_DEVELOPMENT,
  POSTGRES_USER_DEVELOPMENT,
  POSTGRES_PASSWORD_DEVELOPMENT,
  DATABASE_PORT_DEVELOPMENT,
  DATABASE_HOST_DEVELOPMENT,
} = process.env;

export const config = {
  development: {
    username: POSTGRES_USER_DEVELOPMENT,
    password: POSTGRES_PASSWORD_DEVELOPMENT,
    database: POSTGRES_DB_DEVELOPMENT,
    host: DATABASE_HOST_DEVELOPMENT,
    dialect: "postgres",
    port: DATABASE_PORT_DEVELOPMENT,
  },
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: DATABASE_HOST,
    dialect: "postgres",
    port: DATABASE_PORT,
  },
};
