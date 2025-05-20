import { query } from "express-validator";

export const updateCategoryValidator = [
  query("type")
    .notEmpty()
    .isString()
    .isIn(["add", "title"])
    .withMessage("Falta un tipo"),
];
