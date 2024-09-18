import express from "express";
import {
  addSizeValue,
  createSize,
  deleteSizeCollection,
  deleteSizeValue,
  getAllSizes,
  modifyTitleCollectionSize,
} from "../../controllers";
import { validateSizeQuery, asyncHandler } from "../../middleware";

const router = express.Router();

router.get("/", asyncHandler(getAllSizes));

router.post("/", asyncHandler(createSize));

router.patch(
  "/:id",
  validateSizeQuery,
  asyncHandler(async (req, res) => {
    const { sizeType } = req;

    switch (sizeType) {
      case "add":
        return addSizeValue(req, res);
      case "title":
        return modifyTitleCollectionSize(req, res);
      default:
        return res
          .status(400)
          .json({ error: true, message: "Query 'type' inválido" });
    }
  })
);

router.delete(
  "/:id",
  validateSizeQuery,
  asyncHandler(async (req, res) => {
    const { sizeType } = req;

    switch (sizeType) {
      case "collection":
        return deleteSizeCollection(req, res);
      case "value":
        return deleteSizeValue(req, res);
      default:
        return res.status(400).json({
          error: true,
          message: "Tipo de eliminación no especificado o inválido",
        });
    }
  })
);

export default router;
