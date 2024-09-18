import express, { Request, Response } from "express";
import {
  asyncHandler,
  conditionalUpload,
  handleProductType,
} from "../../middleware";
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
import { upload } from "../../lib/multer";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { category_value, category_id } = req.query;
    if (category_id && category_value) {
      return getProductForCategory(req, res);
    }
    return getAllProducts(req, res);
  })
);

router.get("/:id", asyncHandler(getProductById));

router.post(
  "/",

  upload.single("file"),
  asyncHandler(createProducts)
);

router.delete("/:id", asyncHandler(deleteProduct));

router.patch(
  "/:id",
  conditionalUpload,
  handleProductType,
  asyncHandler(async (req: Request, res: Response) => {
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
  })
);

router.get("/image", getImageProduct);

export default router;
