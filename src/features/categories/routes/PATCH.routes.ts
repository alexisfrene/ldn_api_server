import express from "express";
import { addCategoryValue } from "@categories-controllers/add-value.controller";
import { modifyTitleCollectionCategory } from "@categories-controllers/modify-collection-title.controller";
import { updateCategoryValidator } from "@categories-validators/category.edit.validator";
import { matchedData, validationResult } from "express-validator";
import { runValidate } from "@middlewares";
import { upload } from "@lib/multer";

const router = express.Router();

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
  },
);

export default router;
