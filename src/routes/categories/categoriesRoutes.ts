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

router.get("/:id", validateCategoryQuery, async (req, res) => {
  const { type } = req.query;

  if (type === "collection") return getByIdCategory(req, res);
  if (type === "value") return getByIdCategoryValue(req, res);
  if (type === "icon") return getByIdValueImageURL(req, res);

  return res.status(400).json({ error: true, message: "Tipo inválido" });
});
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
