import express from "express";
import { deleteCategoryCollection } from "@categories-controllers/delete-collection.controller";
import { deleteCategoryValue } from "@categories-controllers/delete-value.controller";
import { deleteByIdCategoryValidator } from "@categories-validators/category.delete.validator";
import { matchedData, validationResult } from "express-validator";
import { runValidate } from "@middlewares";

const router = express.Router();

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
  },
);

export default router;
