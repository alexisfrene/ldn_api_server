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
import { CategoryType, Uuid } from "../types";
import { updateCollection } from "../controllers/productsControllers/put";
import { editVariationsDetails } from "../controllers/productsControllers";
const router = express.Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024, files: 10 } });

// GET
router.get("/products", async (req: Request, res: Response) => {
  const category: CategoryType = req.query.category as CategoryType;
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
    const { variation_add, id_collection } = req.query;
    if (variation_add) {
      return addVariation(req, res);
    }
    if (id_collection) {
      return updateCollection(req, res);
    }
    return updateProduct(req, res);
  }
);

// PATCH
router.patch(
  "/products/:id",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    const { edit } = req.query;
    if (edit === "details") return editVariationsDetails(req, res);
    return res.status(400).json({ msj: "nada que ver pa" });
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
