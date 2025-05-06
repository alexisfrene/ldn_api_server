import { body } from "express-validator";

export const createExpenseValidations = [
  body("description").isString(),
  body("name").isString().notEmpty().withMessage("Nombre es requerida"),
];
