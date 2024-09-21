import express from "express";
import { conditionalUpload, handleProductType } from "../../middleware";
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
} from "../../controllers";
import { upload } from "../../lib";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { category_value, category_id } = req.query;
  if (category_id && category_value) {
    return getProductForCategory(req, res, next);
  }
  return getAllProducts(req, res, next);
});

router.get("/:id", getProductById);

router.post(
  "/",

  upload.single("file"),
  createProducts
);

router.delete("/:id", deleteProduct);

router.patch(
  "/:id",
  conditionalUpload,
  handleProductType,
  async (req, res, next) => {
    const { productType } = req;

    switch (productType) {
      case "data":
        return editProductData(req, res, next);
      case "details":
        return editProductDetails(req, res, next);
      case "image":
        return changeImageProduct(req, res, next);
      case "variation":
        return linkVariation(req, res, next);
      default:
        return res.status(400).json({ error: "Tipo de operación no válido" });
    }
  }
);

router.get("/image", getImageProduct);

export default router;
