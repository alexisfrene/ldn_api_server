import express from "express";
import { changeImageProduct } from "@products-controllers/change-image.controller";
import { editProductData } from "@products-controllers/edit-product-data.controller";
import { editProductDetails } from "@products-controllers/edit-product-details.controller";
import { linkVariation } from "@products-controllers/link-variation.controller";
import { conditionalUpload, handleProductType } from "@middlewares";

const router = express.Router();

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

export default router;
