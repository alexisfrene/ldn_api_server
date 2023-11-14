const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const productRoutes = require("./product");

// const helperImg = (filePath, fileName, size = 300) => {
//   return sharp(filePath).resize(size).toFile(`./public/optimize/${fileName}`);
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split(".").pop();
//     cb(null, `${Date.now()}.${ext}`);
//   },
// });

// const upload = multer({
//   storage,
// });

// router.post("/upload", upload.single("file"), (req, res) => {
//   helperImg(req.file.path, `resize-${req.file.filename}`, 100);
//   res.send({ data: "Imagen cargada" });
// });

// router.use("/all_images", express.static(path.join(__dirname, "all_images")));

// router.get("/imagenames", (req, res) => {
//   const directoryPath = path.join(__dirname, "all_images");

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return res.status(500).send("Error al leer el directorio.");
//     }

//     const imageFiles = files.filter((file) => {
//       const extension = path.extname(file).toLowerCase();
//       return (
//         extension === ".jpg" ||
//         extension === ".jpeg" ||
//         extension === ".png" ||
//         extension === ".gif"
//       );
//     });

//     res.json({ imageNames: imageFiles });
//   });
// });

//router.get("/products", productRoutes);

module.exports = router;
