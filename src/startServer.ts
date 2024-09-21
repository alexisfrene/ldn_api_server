import { Application } from "express";

export const startServer = (
  app: Application,
  port: number | string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
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
