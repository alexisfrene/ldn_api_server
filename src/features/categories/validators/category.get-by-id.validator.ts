import { query } from "express-validator";

export const getByIdCategoryValidator = [
  query("type").notEmpty().isString().isIn(["collection", "value", "icon"]),
];
