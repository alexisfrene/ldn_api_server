import express from "express";
import { createCategories } from "@categories-controllers/create-category.controller";
import { createCategoryValidator } from "@categories-validators/category.create.validator";
import { runValidate } from "@middlewares";
import { upload } from "@lib/multer";

const router = express.Router();

router.post(
  "/",
  upload.array("files", 10),
  runValidate(createCategoryValidator),
  createCategories,
);

export default router;
