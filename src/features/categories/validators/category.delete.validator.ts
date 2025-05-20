import { query } from "express-validator";

export const deleteByIdCategoryValidator = [
  query("type").notEmpty().isString().isIn(["collection", "value"]),
];
