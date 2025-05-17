import express from "express";
import { addSizeValue } from "@sizes-controllers/add-value.controller";
import { createSize } from "@sizes-controllers/create-size.controller";
import { deleteSizeCollection } from "@sizes-controllers/delete-collection.controller";
import { deleteSizeValue } from "@sizes-controllers/delete-value.controller";
import { modifyTitleCollectionSize } from "@sizes-controllers/edit-collection-title.controller";
import { getAllSizes } from "@sizes-controllers/get-all.controller";
import { getIdsForSizeName } from "@sizes-controllers/get-size-by-name.controller";
import { matchedData, validationResult } from "express-validator";
import { runValidate } from "@middlewares";
import {
  createSizeValidator,
  deleteSizeValidator,
  editSizeValidator,
} from "@validators";

const router = express.Router();

router.get("/", (req, res) => {
  const { collection_item_name } = req.query;
  console.log("collection_item_name", collection_item_name);
  if (collection_item_name) {
    return getIdsForSizeName(req, res);
  } else {
    return getAllSizes(req, res);
  }
});

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
