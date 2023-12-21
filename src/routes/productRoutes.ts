import express, { Request, Response } from "express";
import multer from "multer";
import {
  getProductsForCategory,
  getAllProducts,
  insertIdImagesVariants,
  createProduct,
  addVariation,
  updateProduct,
  removeCollection,
  deleteProductById,
  getProductById,
} from "../controllers";
import { Categorys, Uuid } from "../types";

const router = express.Router();
const upload = multer();

// GET
router.get("/products", async (req: Request, res: Response) => {
  const category: Categorys = req.query.category as Categorys;
  if (category) {
    return getProductsForCategory(req, res);
  } else {
    return getAllProducts(req, res);
  }
});

router.get("/products/:id", getProductById);

// POST
router.post(
  "/products",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    const productId: Uuid = req.query.product_id as Uuid;
    if (productId) {
      return insertIdImagesVariants(req, res);
    } else {
      return createProduct(req, res);
    }
  }
);

// PUT
router.put(
  "/products/:id",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    const { variation_add } = req.query;
    if (variation_add) {
      return addVariation(req, res);
    } else {
      return updateProduct(req, res);
    }
  }
);

// DELETE
router.delete("/products/:id", async (req: Request, res: Response) => {
  const collectionId: Uuid = req.query.variation_remove as Uuid;
  if (collectionId) {
    return removeCollection(req, res);
  } else {
    return deleteProductById(req, res);
  }
});

export default router;
