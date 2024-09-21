import express from "express";
import {
  addSizeValue,
  createSize,
  deleteSizeCollection,
  deleteSizeValue,
  getAllSizes,
  modifyTitleCollectionSize,
} from "../../controllers";
import { validateSizeQuery } from "../../middleware";

const router = express.Router();

router.get("/", getAllSizes);

router.post("/", createSize);

router.patch("/:id", validateSizeQuery, async (req, res, next) => {
  const { sizeType } = req;

  switch (sizeType) {
    case "add":
      return addSizeValue(req, res, next);
    case "title":
      return modifyTitleCollectionSize(req, res, next);
    default:
      return res
        .status(400)
        .json({ error: true, message: "Query 'type' inválido" });
  }
});

router.delete("/:id", validateSizeQuery, async (req, res, next) => {
  const { sizeType } = req;
  switch (sizeType) {
    case "collection":
      return deleteSizeCollection(req, res, next);
    case "value":
      return deleteSizeValue(req, res, next);
    default:
      return res.status(400).json({
        error: true,
        message: "Tipo de eliminación no especificado o inválido",
      });
  }
});

export default router;
