import express, { NextFunction, Request, Response } from "express";
import { authenticateToken } from "../middleware";
import {
  getImageProduct,
  deleteProduct,
  createProducts,
  getAllProducts,
  editProductDetails,
  editProductData,
  changeImageProduct,
  getProductById,
  linkVariation,
} from "../controllers";
import { upload } from "../lib/multer";

const router = express.Router();

router.get("/products", authenticateToken, getAllProducts);
router.get("/products/:id", authenticateToken, getProductById);
router.get("/products/image", authenticateToken, getImageProduct);

router.post(
  "/products",
  upload.single("file"),
  authenticateToken,
  createProducts
);

router.delete("/products/:id", authenticateToken, deleteProduct);

const conditionalUpload = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.query;
  if (type === "image") {
    upload.single("file")(req, res, next);
  } else {
    next();
  }
};

router.patch(
  "/products/:id",
  conditionalUpload,
  authenticateToken,
  async (req: Request, res: Response) => {
    const { type } = req.query;
    if (type === "data") {
      return editProductData(req, res);
    }
    if (type === "details") {
      return editProductDetails(req, res);
    }
    if (type === "image") {
      return changeImageProduct(req, res);
    }
    if (type === "variation") {
      return linkVariation(req, res);
    }
    return res.status(400).json({ error: "Falta query" });
  }
);

export { router };
