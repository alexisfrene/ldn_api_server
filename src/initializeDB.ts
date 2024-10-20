import { Sequelize } from "sequelize";

export const initializeDB = async (sequelize: Sequelize): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
    throw error;
  }
};
