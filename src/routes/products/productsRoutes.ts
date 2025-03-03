import express from "express";
import { conditionalUpload, handleProductType } from "@middlewares";
import {
  deleteProduct,
  createProducts,
  getAllProducts,
  editProductDetails,
  editProductData,
  changeImageProduct,
  getProductById,
  linkVariation,
  getProductForCategory,
  getImageProduct,
} from "@controllers";
import { upload } from "@lib";
import { getTemporaryUrl } from "@lib/minio";
import axios from "axios";
const router = express.Router();

router.get("/images/:fileName", async (req, res) => {
  try {
    console.log("Obteniendo imagen");
    const { fileName } = req.params;
    const userId = req.user;

    const imageUrl = await getTemporaryUrl(`${userId}/products/${fileName}`);
    console.log(imageUrl);
    const response = await axios.get(imageUrl, { responseType: "stream" });

    res.setHeader("Content-Type", response.headers["content-type"]);

    response.data.pipe(res);
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    res.status(500).json({ error: "No se pudo obtener la imagen" });
  }
});

router.get("/", async (req, res) => {
  const { category_value, category_id } = req.query;
  if (category_id && category_value) {
    return getProductForCategory(req, res);
  }
  return getAllProducts(req, res);
});

router.get("/:id", getProductById);

router.post(
  "/",

  upload.single("file"),
  createProducts
);

router.delete("/:id", deleteProduct);

router.patch("/:id", conditionalUpload, handleProductType, async (req, res) => {
  const { productType } = req;

  switch (productType) {
    case "data":
      return editProductData(req, res);
    case "details":
      return editProductDetails(req, res);
    case "image":
      return changeImageProduct(req, res);
    case "variation":
      return linkVariation(req, res);
    default:
      return res.status(400).json({ error: "Tipo de operación no válido" });
  }
});

router.get("/image", getImageProduct);

export default router;
