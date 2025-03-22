process.loadEnvFile();

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
} = process.env;

export const config = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: DATABASE_HOST,
    dialect: "postgres",
    port: DATABASE_PORT,
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
