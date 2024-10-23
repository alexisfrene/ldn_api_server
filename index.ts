import { app } from "./src/app";
import { db } from "./src/lib";
import { initializeDB } from "./src/initializeDB";
import { startServer } from "./src/startServer";

process.loadEnvFile();

const PORT: string | number = process.env.PORT || 3210;

const main = async (): Promise<void> => {
  try {
    await initializeDB(db.sequelize);
    await startServer(app, PORT);
  } catch (error) {
    console.error("Error en la inicialización de la aplicación:", error);
    process.exit(1);
  }
};

main();
