import { body, query } from "express-validator";

export const createSizeValidator = [
  body("title").notEmpty().isString().isLength({ min: 3, max: 50 }),
  body("values")
    .isArray({ min: 1, max: 25 })
    .withMessage('El campo "values" debe ser un array.')
    .custom((values: { value: string }[]) => {
      for (const value of values) {
        if (typeof value.value !== "string") {
          throw new Error('Cada elemento en "values" debe ser un string.');
        }
      }
      return true;
    })
    .withMessage('El campo "values" debe contener solo strings.'),
];

export const editSizeValidator = [
  query("type").notEmpty().isString().isIn(["add", "title"]),
  body("value.value").optional().isString(),
  body("title").optional().isString(),
];

export const deleteSizeValidator = [
  query("type").notEmpty().isString().isIn(["collection", "value"]),
  body("value").optional().isString(),
  body("title").optional().isString(),
];
