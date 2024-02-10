import { promises as fsPromises } from "fs";
import path from "path";

export const deleteEmptyFolders = async (route: string, levels = 1) => {
  try {
    const pathParts = route.split("/");
    const commonPath = pathParts.slice(0, -levels).join("/") + "/";
    const folderPath = path.join(__dirname, `../../../../public/${commonPath}`);
    const files = await fsPromises.readdir(folderPath);
    if (!files || files.length === 0) {
      await fsPromises.rmdir(folderPath);
      console.log("Carpeta vacía eliminada:", folderPath);
    }
  } catch (err) {
    console.error("Error al eliminar la carpeta:", err);
  }
};
