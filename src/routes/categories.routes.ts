import express from "express";
import multer from "multer";
import path from "path";
import { createCategories, getAllCategories } from "../controllers";
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
//GET
router.get("/categories", authenticateToken, getAllCategories);
//POST
router.post(
  "/categories",
  upload.array("files"),
  authenticateToken,
  createCategories
);

export { router };
