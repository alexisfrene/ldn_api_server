import express from "express";
import { addSizeValue } from "@sizes-controllers/add-value.controller";
import { modifyTitleCollectionSize } from "@sizes-controllers/edit-collection-title.controller";
import { editSizeValidator } from "@sizes-validators/size.validator";
import { matchedData, validationResult } from "express-validator";
import { runValidate } from "@middlewares";

const router = express.Router();

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

export default router;
