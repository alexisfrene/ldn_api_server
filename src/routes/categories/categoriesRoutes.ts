import express from "express";
import { matchedData, validationResult } from "express-validator";
import { upload } from "@lib";
import { runValidate } from "@middlewares";
import {
  getByIdCategoryValidator,
  deleteByIdCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
} from "@validators";
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
} from "@controllers";
import { getTemporaryUrl } from "@lib/minio";

const router = express.Router();

import axios from "axios";

router.get("/images/:fileName", async (req, res) => {
  try {
    console.log("Obteniendo imagen");
    const { fileName } = req.params;
    const userId = req.user;

    const imageUrl = await getTemporaryUrl(`${userId}/categories/${fileName}`);
    console.log(imageUrl);
    const response = await axios.get(imageUrl, { responseType: "stream" });

    res.setHeader("Content-Type", response.headers["content-type"]);

    response.data.pipe(res);
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    res.status(500).json({ error: "No se pudo obtener la imagen" });
  }
});

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

router.patch(
  "/:id",
  upload.array("files"),
  runValidate(updateCategoryValidator),
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      if (data.type === "add") return addCategoryValue(req, res);
      if (data.type === "title") return modifyTitleCollectionCategory(req, res);
    }

    return res.status(400).json({ errors: result.array() });
  }
);

export default router;
