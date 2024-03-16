import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "tu_base_de_datos",
  "tu_usuario",
  "tu_contraseña",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432, // Este es el puerto por defecto, ajusta según sea necesario
  }
);
