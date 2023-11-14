const fs = require("fs").promises;
const path = require("path");

exports.deleteEmptyFolders = async (route, levels = 1) => {
  try {
    const pathParts = route.split("/");
    const commonPath = pathParts.slice(0, -levels).join("/") + "/";
    const folderPath = path.join(__dirname, `../../../public/${commonPath}`);
    if (levels === 2) console.log("asdfas", folderPath);
    const files = await fs.readdir(folderPath);

    if (!files || files.length === 0) {
      await fs.rmdir(folderPath);
      console.log("Carpeta vacía eliminada:", folderPath);
    }
  } catch (err) {
    console.error("Error al eliminar la carpeta:", err);
  }
};
