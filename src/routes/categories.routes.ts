import express from "express";
import multer from "multer";
import path from "path";
import {
  addCategoryValue,
  createCategories,
  deleteCategory,
  getAllCategories,
  getByIdCategory,
  getByIdCategoryValue,
  getByIdValueImageURL,
  deleteCategoryValue,
} from "../controllers";
import { authenticateToken } from "../middleware";

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
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

router.get("/categories/:id", authenticateToken, async (req, res) => {
  const { type } = req.query;
  if (type === "collection") {
    return getByIdCategory(req, res);
  }
  if (type === "value") {
    return getByIdCategoryValue(req, res);
  }
  if (type === "icon") {
    return getByIdValueImageURL(req, res);
  }

  return res.status(500).json({ error: true, message: "Falta query" });
});
router.get("/categories", authenticateToken, getAllCategories);

router.post(
  "/categories",
  upload.array("files"),
  authenticateToken,
  createCategories
);

router.patch(
  "/categories/:id",
  upload.array("files"),
  authenticateToken,
  addCategoryValue
);

router.delete("/categories/:id", authenticateToken, async (req, res) => {
  const type = req.query.type;
  if (type === "collection") {
    return deleteCategory(req, res);
  }
  if (type === "value") {
    return deleteCategoryValue(req, res);
  }
  return res
    .status(400)
    .json({ error: true, message: "No se especifico una typo de eliminación" });
});

export { router };
