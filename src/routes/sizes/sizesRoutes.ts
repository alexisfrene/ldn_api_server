import express from "express";
import { matchedData, validationResult } from "express-validator";
import {
  addSizeValue,
  createSize,
  deleteSizeCollection,
  deleteSizeValue,
  getAllSizes,
  modifyTitleCollectionSize,
} from "../../controllers";
import { runValidate } from "../../middleware";
import {
  createSizeValidator,
  deleteSizeValidator,
  editSizeValidator,
} from "../../validators";

const router = express.Router();

router.get("/", getAllSizes);

router.post("/", runValidate(createSizeValidator), createSize);

router.patch("/:id", runValidate(editSizeValidator), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    switch (data.type) {
      case "add":
        return addSizeValue(req, res);
      case "title":
        return modifyTitleCollectionSize(req, res);
    }
  }

  return res.status(400).json({ errors: result.array() });
});

router.delete("/:id", runValidate(deleteSizeValidator), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    switch (data.type) {
      case "collection":
        return deleteSizeCollection(req, res);
      case "value":
        return deleteSizeValue(req, res);
    }
  }

  return res.status(400).json({ errors: result.array() });
});

export default router;
