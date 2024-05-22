import express, { Request, Response } from "express";
import multer from "multer";
import path from "node:path";
import { authenticateToken } from "../middleware";
import {
  getImageProduct,
  deleteProduct,
  createProducts,
  getProducts,
  editProductDetails,
  editProductData,
} from "../controllers";

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (__, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, "temp/");
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  }),
});
const router = express.Router();

//GET
router.get("/products", authenticateToken, getProducts);
router.get("/products/image", authenticateToken, getImageProduct);
//POST
router.post(
  "/products",
  upload.single("file"),
  authenticateToken,
  createProducts
);
//DELETE
router.delete("/products/:id", authenticateToken, deleteProduct);
//PATCH
router.patch(
  "/products/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { type } = req.query;
    if (type === "data") {
      return editProductData(req, res);
    }
    if (type === "details") {
      return editProductDetails(req, res);
    }
    return res.status(400).json({ error: "Falta query" });
  }
);

export { router };
