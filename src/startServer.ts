import { Application } from "express";
import { runMigrations } from "migrate";
import fs from "node:fs";
import path from "node:path";
import { deleteFilesInTemp } from "@utils";

const tempDir = path.join(process.cwd(), "temp");

export const startServer = (
  app: Application,
  port: number | string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
      console.log('Carpeta "temp" creada exitosamente.');
    } else {
      console.log('La carpeta "temp" ya existe.');
    }
    setInterval(() => {
      console.log('Ejecutando limpieza de la carpeta "temp"...');
      deleteFilesInTemp();
    }, 3600000);

    try {
      runMigrations();
      app.listen(port, () => {
        console.log(`Servidor en ejecución en http://localhost:${port}`);
        resolve();
      });
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
      reject(error);
    }
  });
};
