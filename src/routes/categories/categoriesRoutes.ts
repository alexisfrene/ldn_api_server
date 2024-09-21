import express from "express";
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

router.get("/:id", validateCategoryQuery, async (req, res, next) => {
  const { type } = req.query;

  if (type === "collection") return getByIdCategory(req, res, next);
  if (type === "value") return getByIdCategoryValue(req, res, next);
  if (type === "icon") return getByIdValueImageURL(req, res, next);

  return res.status(400).json({ error: true, message: "Tipo inválido" });
});
router.get("/", getAllCategories);
router.post("/", upload.array("files"), createCategories);
router.patch("/:id", upload.array("files"), async (req, res, next) => {
  const { type } = req.query;
  if (type === "add") return addCategoryValue(req, res, next);
  if (type === "title") return modifyTitleCollectionCategory(req, res, next);

  return res
    .status(400)
    .json({ error: true, message: "Tipo de consulta inválido" });
});
router.delete("/:id", validateCategoryQuery, async (req, res, next) => {
  const { type } = req.query;
  if (type === "collection") return deleteCategoryCollection(req, res, next);
  if (type === "value") return deleteCategoryValue(req, res, next);

  return res
    .status(400)
    .json({ error: true, message: "Tipo de eliminación inválido" });
});

export default router;
