import express from "express";
import { matchedData, validationResult } from "express-validator";
import { deleteSizeCollection } from "@sizes-controllers/delete-collection.controller";
import { deleteSizeValue } from "@sizes-controllers/delete-value.controller";
import { deleteSizeValidator } from "@sizes-validators/size.validator";
import { runValidate } from "@middlewares";

const router = express.Router();

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
