import { body } from "express-validator";

export const createExpenseValidations = [
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Descripción es requerida"),
  body("name").isString().notEmpty().withMessage("Nombre es requerida"),
];
