const sharp = require("sharp");
const fs = require("fs");

exports.handlerImageDestination = (
  categoryFolder,
  productFolder,
  files,
  mainImage
) => {
  const direction = [];
  let primaryImage = "";
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.originalname.split(".").pop();
    const newFileName = `${Date.now()}.${ext}`;
    const originalImagePath = `./public/uploads/${categoryFolder}/${productFolder}/original-${newFileName}`;
    fs.mkdirSync(`./public/uploads/${categoryFolder}`, { recursive: true });
    fs.mkdirSync(`./public/uploads/${categoryFolder}/${productFolder}`, {
      recursive: true,
    });

    fs.writeFileSync(originalImagePath, file.buffer);
    if (file.originalname === mainImage) {
      const miniatureImagePath = `./public/optimize/${categoryFolder}/${productFolder}/miniature-${newFileName}`;
      fs.mkdirSync(`./public/optimize/${categoryFolder}`, { recursive: true });
      fs.mkdirSync(`./public/optimize/${categoryFolder}/${productFolder}`, {
        recursive: true,
      });
      sharp(file.buffer).resize(200).toFile(miniatureImagePath);
      primaryImage = `uploads/${categoryFolder}/${productFolder}/original-${newFileName}`;
      direction.unshift(
        `optimize/${categoryFolder}/${productFolder}/miniature-${newFileName}`
      );
    }

    direction.push(
      `uploads/${categoryFolder}/${productFolder}/original-${newFileName}`
    );
  }

  return { direction, primaryImage };
};
