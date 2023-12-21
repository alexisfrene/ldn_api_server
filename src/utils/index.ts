import sharp from "sharp";
import fs from "fs";
const transformarString = (inputString: string): string => {
  const cleanString = inputString.replace(/[^a-zA-Z0-9\s]/g, "");
  const transformedString = cleanString.replace(/\s+/g, "_");

  return transformedString;
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
  const direction: string[] = [];
  let primaryImage = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.originalname.split(".").pop() || "";
    const newFileName = `${Date.now()}.${ext}`;
    const originalImagePath = `./public/uploads/${nickFolder}/${productFolder}/original-${newFileName}`;

    fs.mkdirSync(`./public/uploads/${nickFolder}`, { recursive: true });
    fs.mkdirSync(`./public/uploads/${nickFolder}/${productFolder}`, {
      recursive: true,
    });

    fs.writeFileSync(originalImagePath, file.buffer);

    if (file.originalname === mainImage) {
      const miniatureImagePath = `./public/optimize/${nickFolder}/${productFolder}/miniature-${newFileName}`;
      fs.mkdirSync(`./public/optimize/${nickFolder}`, { recursive: true });
      fs.mkdirSync(`./public/optimize/${nickFolder}/${productFolder}`, {
        recursive: true,
      });

      sharp(file.buffer).resize(200).toFile(miniatureImagePath);
      primaryImage = `uploads/${nickFolder}/${productFolder}/original-${newFileName}`;
      withMiniature &&
        direction.unshift(
          `optimize/${nickFolder}/${productFolder}/miniature-${newFileName}`
        );
    }

    direction.push(
      `uploads/${nickFolder}/${productFolder}/original-${newFileName}-${i}`
    );
  }

  return { direction, primaryImage };
};
