import sharp from "sharp";
import fs, { promises as fsPromises } from "fs";
import { constants, access } from "fs/promises";
import path from "path";
const { unlink } = fsPromises;

const transformarString = (inputString: string): string => {
  const cleanString = inputString.replace(/[^a-zA-Z0-9\s]/g, "");
  const transformedString = cleanString.replace(/\s+/g, "_");

  return transformedString.toLowerCase();
};
interface ImageDestinationOptions {
  categoryFolder?: string;
  productFolder: string;
  files: Express.Multer.File[];
  mainImage?: string;
  withMiniature?: boolean;
}

export const handlerImageDestination = ({
  categoryFolder = "sin_name",
  productFolder,
  files,
  mainImage = "",
  withMiniature = true,
}: ImageDestinationOptions) => {
  const nickFolder = transformarString(categoryFolder);
  const collectionName = transformarString(productFolder);
  const direction: string[] = [];
  let primaryImage = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.originalname.split(".").pop() || "";
    const newFileName = `${Date.now() + "--" + Math.random() + "-" + i}.${ext}`;
    const originalImagePath = `./public/uploads/${nickFolder}/${collectionName}/original-${newFileName}`;

    fs.mkdirSync(`./public/uploads/${nickFolder}`, { recursive: true });
    fs.mkdirSync(`./public/uploads/${nickFolder}/${collectionName}`, {
      recursive: true,
    });

    fs.writeFileSync(originalImagePath, file.buffer);

    if (file.originalname === mainImage) {
      const miniatureImagePath = `./public/optimize/${nickFolder}/${collectionName}/miniature-${newFileName}`;
      fs.mkdirSync(`./public/optimize/${nickFolder}`, { recursive: true });
      fs.mkdirSync(`./public/optimize/${nickFolder}/${collectionName}`, {
        recursive: true,
      });

      sharp(file.buffer)
        .rotate()
        .resize({
          width: 384,
          height: 384,
          fit: "fill",
        })
        .toFile(miniatureImagePath);
      primaryImage = `uploads/${nickFolder}/${collectionName}/original-${newFileName}`;
      withMiniature &&
        direction.unshift(
          `optimize/${nickFolder}/${collectionName}/miniature-${newFileName}`
        );
    }

    direction.push(
      `uploads/${nickFolder}/${collectionName}/original-${newFileName}`
    );
  }

  return { direction, primaryImage };
};

export const removeImage = async (imagePath: string) => {
  try {
    await access(imagePath, constants.F_OK);
    await unlink(imagePath);
    return { OK: true, message: "Imagen eliminada correctamente!" };
  } catch (error) {
    if (error === "ENOENT") {
      return { OK: false, message: "El archivo no existe" };
    } else {
      return { OK: false, message: "Error al eliminar la imagen" };
    }
  }
};

export const deleteEmptyFolders = async (route: string, levels = 1) => {
  try {
    const pathParts = route.split("/");
    const commonPath = pathParts.slice(0, -levels).join("/") + "/";
    const folderPath = path.join(__dirname, `../../public/${commonPath}`);
    const files = await fsPromises.readdir(folderPath);
    if (!files || files.length === 0) {
      await fsPromises.rmdir(folderPath);
      console.log("Carpeta vacía eliminada:", folderPath);
    }
  } catch (err) {
    console.error("Error al eliminar la carpeta:", err);
  }
};
