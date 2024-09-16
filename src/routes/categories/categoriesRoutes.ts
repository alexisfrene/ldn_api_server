// routes/categoriesRoutes.ts
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
import { upload } from "../../lib/multer";
import { validateCategoryQuery, asyncHandler } from "../../middleware";

const router = express.Router();

// Obtener categorías con tipo de consulta validado por middleware
router.get(
  "/:id",
  validateCategoryQuery,
  asyncHandler(async (req, res) => {
    const { type } = req.query;

    if (type === "collection") return getByIdCategory(req, res);
    if (type === "value") return getByIdCategoryValue(req, res);
    if (type === "icon") return getByIdValueImageURL(req, res);

    return res.status(400).json({ error: true, message: "Tipo inválido" });
  })
);

// Obtener todas las categorías
router.get("/", asyncHandler(getAllCategories));

// Crear categorías con carga de archivos
router.post("/", upload.array("files"), asyncHandler(createCategories));

// Modificar categorías, agregando valores o modificando títulos
router.patch(
  "/:id",
  upload.array("files"),
  asyncHandler(async (req, res) => {
    const { type } = req.query;

    if (type === "add") return addCategoryValue(req, res);
    if (type === "title") return modifyTitleCollectionCategory(req, res);

    return res
      .status(400)
      .json({ error: true, message: "Tipo de consulta inválido" });
  })
);

// Eliminar categorías
router.delete(
  "/:id",
  validateCategoryQuery,
  asyncHandler(async (req, res) => {
    const { type } = req.query;

    if (type === "collection") return deleteCategoryCollection(req, res);
    if (type === "value") return deleteCategoryValue(req, res);

    return res
      .status(400)
      .json({ error: true, message: "Tipo de eliminación inválido" });
  })
);

export default router;
