import { body, query } from "express-validator";

export const getByIdCategoryValidator = [
  query("type").notEmpty().isString().isIn(["collection", "value", "icon"]),
];

export const deleteByIdCategoryValidator = [
  query("type").notEmpty().isString().isIn(["collection", "value"]),
];

export const createCategoryValidator = [
  body("title").notEmpty().isString().isLength({ min: 3, max: 50 }),
  body("values")
    .isArray({ min: 1, max: 25 })
    .withMessage('El campo "values" debe ser un array.')
    .custom((values: any[]) => {
      for (const value of values) {
        if (typeof value !== "string") {
          throw new Error('Cada elemento en "values" debe ser un string.');
        }
      }
      return true;
    })
    .withMessage('El campo "values" debe contener solo strings.'),
];

export const updateCategoryValidator = [
  query("type")
    .notEmpty()
    .isString()
    .isIn(["add", "title"])
    .withMessage("Falta un tipo"),
];
