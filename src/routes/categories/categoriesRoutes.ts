import express from "express";
import { matchedData, validationResult } from "express-validator";
import { upload } from "@lib";
import { runValidate } from "../../middleware";
import {
  getByIdCategoryValidator,
  deleteByIdCategoryValidator,
  createCategoryValidator,
} from "../../validators";
import {
  addCategoryValue,
  createCategories,
  deleteCategoryCollection,
  deleteCategoryValue,
  getAllCategories,
  getByIdCategory,
  getByIdCategoryValue,
  getByIdValueImageURL,
  modifyTitleCollectionCategory,
} from "../../controllers";

const router = express.Router();

router.get("/:id", runValidate(getByIdCategoryValidator), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.type === "collection") return getByIdCategory(req, res);
    if (data.type === "value") return getByIdCategoryValue(req, res);
    if (data.type === "icon") return getByIdValueImageURL(req, res);
  }

  return res.status(400).json({ errors: result.array() });
});

router.delete(
  "/:id",
  runValidate(deleteByIdCategoryValidator),
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      if (data.type === "collection") return deleteCategoryCollection(req, res);
      if (data.type === "value") return deleteCategoryValue(req, res);
    }

    return res.status(400).json({ errors: result.array() });
  }
);
router.get("/", getAllCategories);

router.post(
  "/",
  upload.array("files"),
  runValidate(createCategoryValidator),
  createCategories
);

router.patch("/:id", upload.array("files"), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.type === "add") return addCategoryValue(req, res);
    if (data.type === "title") return modifyTitleCollectionCategory(req, res);
  }

  return res.status(400).json({ errors: result.array() });
});

export default router;
