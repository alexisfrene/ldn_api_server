import express, { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { upload } from "@lib";
import { runValidate } from "@middlewares";
import {
  getByIdCategoryValidator,
  deleteByIdCategoryValidator,
  createCategoryValidator,
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

const router = express.Router();

router.get(
  "/:id",
  runValidate(getByIdCategoryValidator),
  async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      if (data.type === "collection") next(getByIdCategory(req, res));
      if (data.type === "value") next(getByIdCategoryValue(req, res));
      if (data.type === "icon") next(getByIdValueImageURL(req, res));
    }

    res.status(400).json({ errors: result.array() });
  }
);

router.delete(
  "/:id",
  runValidate(deleteByIdCategoryValidator),
  async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      if (data.type === "collection") next(deleteCategoryCollection(req, res));
      if (data.type === "value") next(deleteCategoryValue(req, res));
    }

    res.status(400).json({ errors: result.array() });
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
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      if (data.type === "add") {
        next(addCategoryValue(req, res));
      }
      if (data.type === "title") {
        next(modifyTitleCollectionCategory(req, res));
      }
    }
    next(res.status(400).json({ errors: result.array() }));
  }
);

export default router;
