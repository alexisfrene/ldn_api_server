process.loadEnvFile();
type Env = "development" | "production";

const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  FORCE_SYNC,
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
  MINIO_PORT,
  MINIO_HOST,
  MINIO_BUCKET_NAME,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
  MINIO_ROOT_USER,
  MINIO_ROOT_PASSWORD,
  MINIO_PORT_DEVELOPMENT,
  MINIO_HOST_DEVELOPMENT,
  MINIO_BUCKET_NAME_DEVELOPMENT,
  MINIO_ACCESS_KEY_DEVELOPMENT,
  MINIO_SECRET_KEY_DEVELOPMENT,
  MINIO_ROOT_USER_DEVELOPMENT,
  MINIO_ROOT_PASSWORD_DEVELOPMENT,
  SALT_ROUNDS,
} = process.env;

export const port = PORT || 3210;
export const env = (NODE_ENV as Env) || "development";
export const jwtSecret = JWT_SECRET;
export const forceSync = FORCE_SYNC === "true";
export const saltRounds = Number(SALT_ROUNDS);
export const databaseConfig =
  env === "development"
    ? {
        database: POSTGRES_DB_DEVELOPMENT,
        username: POSTGRES_USER_DEVELOPMENT,
        password: POSTGRES_PASSWORD_DEVELOPMENT,
        port: DATABASE_PORT_DEVELOPMENT,
        host: DATABASE_HOST_DEVELOPMENT,
      }
    : {
        database: POSTGRES_DB,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: DATABASE_PORT,
        host: DATABASE_HOST,
      };

export const minioConfig =
  env === "development"
    ? {
        port: MINIO_PORT_DEVELOPMENT,
        host: MINIO_HOST_DEVELOPMENT,
        bucketName: MINIO_BUCKET_NAME_DEVELOPMENT,
        accessKey: MINIO_ACCESS_KEY_DEVELOPMENT,
        secretKey: MINIO_SECRET_KEY_DEVELOPMENT,
        rootUser: MINIO_ROOT_USER_DEVELOPMENT,
        rootPassword: MINIO_ROOT_PASSWORD_DEVELOPMENT,
      }
    : {
        port: MINIO_PORT,
        host: MINIO_HOST,
        bucketName: MINIO_BUCKET_NAME,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
        rootUser: MINIO_ROOT_USER,
        rootPassword: MINIO_ROOT_PASSWORD,
      };
