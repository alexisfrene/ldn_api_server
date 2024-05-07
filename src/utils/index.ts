import sharp from "sharp";
import bcrypt from "bcrypt";
import fs from "node:fs";
import fsPromises, { constants, access, unlink } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
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
    const collectionFolderPath = path.join(
      root,
      "public",
      "uploads",
      nickFolder
    );
    const originalImagePath = path.join(
      collectionFolderPath,
      collectionName,
      `original-${newFileName}`
    );

    fs.mkdirSync(collectionFolderPath, { recursive: true });
    fs.mkdirSync(path.join(collectionFolderPath, collectionName), {
      recursive: true,
    });

    fs.writeFileSync(originalImagePath, file.buffer);

    if (file.originalname === mainImage) {
      const miniatureFolder = path.join(root, "public", "optimize", nickFolder);
      const miniatureImagePath = path.join(
        miniatureFolder,
        collectionName,
        `miniature-${newFileName}`
      );
      fs.mkdirSync(path.join(miniatureFolder), {
        recursive: true,
      });
      fs.mkdirSync(path.join(miniatureFolder, collectionName), {
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
      //Estas url son para el guardado en la DB
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
  const pathComplete = path.join(root, "public", imagePath);
  try {
    await access(pathComplete, constants.F_OK);
    await unlink(pathComplete);
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
    const folderPath = path.join(root, "public", commonPath);
    const files = await fsPromises.readdir(folderPath);
    if (!files || files.length === 0) {
      await fsPromises.rmdir(folderPath);
      console.log("Carpeta vacía eliminada:", folderPath);
    }
  } catch (err) {
    console.error("Error al eliminar la carpeta:", err);
  }
};
const saltRoundsString = process.env.SALT_ROUNDS;
if (!saltRoundsString) {
  throw new Error(
    "The salt rounds were not found in the environment variables"
  );
}
const saltRounds = parseInt(saltRoundsString, 10);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const getFileNameWithoutExtension = (
  fileNameWithExtension: string
): string => {
  const lastIndex = fileNameWithExtension.lastIndexOf(".");
  if (lastIndex !== -1) {
    return fileNameWithExtension.substring(0, lastIndex);
  }
  return fileNameWithExtension;
};
