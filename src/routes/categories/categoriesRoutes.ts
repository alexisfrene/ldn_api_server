import express from "express";
import { matchedData, query, validationResult } from "express-validator";
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
import { upload } from "../../lib";
import { validateCategoryQuery } from "../../middleware";

const router = express.Router();

router.get(
  "/:id",
  query("type").notEmpty().escape(),
  validateCategoryQuery,
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      if (data.type === "collection") return getByIdCategory(req, res);
      if (data.type === "value") return getByIdCategoryValue(req, res);
      if (data.type === "icon") return getByIdValueImageURL(req, res);
    }

    return res.status(400).json({ errors: result.array() });
  }
);

router.get("/", getAllCategories);

router.post("/", upload.array("files"), createCategories);

router.patch("/:id", upload.array("files"), async (req, res) => {
  const { type } = req.query;
  if (type === "add") return addCategoryValue(req, res);
  if (type === "title") return modifyTitleCollectionCategory(req, res);

  return res
    .status(400)
    .json({ error: true, message: "Tipo de consulta inválido" });
});

router.delete("/:id", validateCategoryQuery, async (req, res) => {
  const { type } = req.query;
  if (type === "collection") return deleteCategoryCollection(req, res);
  if (type === "value") return deleteCategoryValue(req, res);

  return res
    .status(400)
    .json({ error: true, message: "Tipo de eliminación inválido" });
});

export default router;
